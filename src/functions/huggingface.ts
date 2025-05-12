import { GSContext, GSStatus, PlainObject } from "@godspeedsystems/core";

/**
 * This function is intended to be called by a YAML workflow and passed `args`.
 * It constructs the appropriate request and delegates the call to the HuggingFace plugin.
 */
export default async function (ctx: GSContext, args: PlainObject): Promise<GSStatus> {
  const {
    task = "textGeneration",        // e.g., "summarization", "translation", etc.
    inputs,                          // User-provided prompt or input data
    model,                          // Optional model override
    provider,
    parameters = {},                // Optional parameters for model
    ...rest                         // Any task-specific fields (like labels, context, etc.)
  } = args;

  const client = ctx.datasources.huggingface; // hf = key in your huggingface.yaml

  // Must match what plugin expects to route properly
  const meta = {
    fnNameInWorkflow: task
  };

  // Match plugin's expected structure
  const request = {
    task,              // Optional fallback
    provider,
    model,
    inputs,
    parameters,
    ...rest            // Allow extra fields like labels, candidate_labels etc.
  };

  // Delegate to plugin
  const result = await client.execute(ctx, request);
  return result;
}
