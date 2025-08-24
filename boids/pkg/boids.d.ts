/* tslint:disable */
/* eslint-disable */
export class Universe {
  free(): void;
  constructor(num_boids: number, w: number, h: number);
  set_desired_dist(v: number): void;
  set_sep_weight(v: number): void;
  set_ali_weight(v: number): void;
  set_coh_weight(v: number): void;
  set_perception(v: number): void;
  set_turn_factor(v: number): void;
  set_max_speed(v: number): void;
  set_noise(v: number): void;
  tick(): void;
  boids_ptr(): number;
  boids_len_f32(): number;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_universe_free: (a: number, b: number) => void;
  readonly universe_new: (a: number, b: number, c: number) => number;
  readonly universe_set_desired_dist: (a: number, b: number) => void;
  readonly universe_set_sep_weight: (a: number, b: number) => void;
  readonly universe_set_ali_weight: (a: number, b: number) => void;
  readonly universe_set_coh_weight: (a: number, b: number) => void;
  readonly universe_set_perception: (a: number, b: number) => void;
  readonly universe_set_turn_factor: (a: number, b: number) => void;
  readonly universe_set_max_speed: (a: number, b: number) => void;
  readonly universe_set_noise: (a: number, b: number) => void;
  readonly universe_tick: (a: number) => void;
  readonly universe_boids_ptr: (a: number) => number;
  readonly universe_boids_len_f32: (a: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
