export async function lib() {
  const { memory, ...pkg } = await import("./pkg");
  const wasmModule = await import("./pkg/conversion_bg.wasm");
  pkg.memory = wasmModule.memory;
  return pkg;
}
