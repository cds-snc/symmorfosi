const { releaseModel } = require("./model");

const clearCollection = async (): Promise<false> => {
  const argv: any = require("minimist")(process.argv.slice(2));

  if (argv.delete === "true") {
    try {
      await releaseModel.deleteMany({});
      process.exit();
    } catch (e) {
      console.log(e.message);
    }
  }

  return false;
};

module.exports.clearCollection = clearCollection;
