import {
  generateSchemaTypes,
  generateReactQueryComponents,
} from "@openapi-codegen/typescript";
import { defineConfig } from "@openapi-codegen/cli";
export default defineConfig({
  lawyersSiteApi: {
    from: {
      source: "url",
      url: "http://109.172.46.169:8001/openapi.json",
    },
    outputDir: "generated",
    to: async (context) => {
      const filenamePrefix = "lawyersSiteApi";
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix,
      });
      await generateReactQueryComponents(context, {
        filenamePrefix,
        schemasFiles,
      });
    },
  },
});
