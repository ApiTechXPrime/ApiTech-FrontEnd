import {
  createElementBlock,
  normalizeClass,
  openBlock
} from "./chunk-QNGQRF5U.js";

// node_modules/primevue/inputtext/inputtext.esm.js
var script = {
  name: "InputText",
  emits: ["update:modelValue"],
  props: {
    modelValue: null
  },
  methods: {
    onInput(event) {
      this.$emit("update:modelValue", event.target.value);
    }
  },
  computed: {
    filled() {
      return this.modelValue != null && this.modelValue.toString().length > 0;
    }
  }
};
var _hoisted_1 = ["value"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("input", {
    class: normalizeClass(["p-inputtext p-component", { "p-filled": $options.filled }]),
    value: $props.modelValue,
    onInput: _cache[0] || (_cache[0] = (...args) => $options.onInput && $options.onInput(...args))
  }, null, 42, _hoisted_1);
}
script.render = render;

export {
  script
};
//# sourceMappingURL=chunk-NHIAX65L.js.map
