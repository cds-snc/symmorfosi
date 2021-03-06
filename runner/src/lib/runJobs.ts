import k8s = require("@kubernetes/client-node");
import { generateReleaseId } from "./generateReleaseId";
import { modifyJob } from "./modifyJob";
import RunLock from "./RunLock";
import { uniqueArray } from "../lib/getUnique";
import { V1DeleteOptions } from "@kubernetes/client-node";
import { executeWebhook } from "./executeWebhook";

async function asyncForEach(
  array: any[],
  callback: (item: any, index: number, collection: any[]) => any
): Promise<any> {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export const runJobs = async (): Promise<void> => {

  try {

    if (RunLock.locked) {
      return;
    }

    RunLock.locked = true;

    const kc = new k8s.KubeConfig();

    if (process.env.NODE_ENV === "production") {
      kc.loadFromCluster();
    } else {
      kc.loadFromDefault();
    }

    const jobsApi = kc.makeApiClient(k8s.Batch_v1Api);
    const namespace = process.env.JOBS_NAMESPACE || "security-goals";
    // Generate release ID
    const releaseId = await generateReleaseId();
    const res = await jobsApi.listNamespacedJob(namespace);

    if (!res.body.items) {
      RunLock.locked = false;
      return;
    }

    const items = uniqueArray(res.body.items);

    await asyncForEach(items, async (item) => {
      const name: string = item.metadata.name;
      console.log("Restarting", name);

      const options: V1DeleteOptions = {
        apiVersion: "batch/v1",
        dryRun: null,
        gracePeriodSeconds: null,
        kind: "DeleteOptions",
        orphanDependents: null,
        preconditions: null,
        propagationPolicy: "Foreground"
      };
      await jobsApi.deleteNamespacedJob(name, namespace, "false", options);
      const body = await modifyJob(item, releaseId);
      console.log("starting", body.metadata.name);
      await jobsApi.createNamespacedJob(namespace, body);
    });

    await executeWebhook();
    RunLock.locked = false;
    return;
  } catch (e) {
    console.log("Error", e);
    RunLock.locked = false;
    return;
  }
};
