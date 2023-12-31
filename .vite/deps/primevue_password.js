import {
  OverlayEventBus
} from "./chunk-ZKQJQZRH.js";
import {
  script
} from "./chunk-SJ2L5B2A.js";
import {
  ConnectedOverlayScrollHandler,
  DomHandler,
  UniqueComponentId,
  ZIndexUtils
} from "./chunk-QKO2XLOI.js";
import {
  script as script2
} from "./chunk-NHIAX65L.js";
import {
  Transition,
  createBaseVNode,
  createCommentVNode,
  createElementBlock,
  createVNode,
  mergeProps,
  normalizeClass,
  normalizeStyle,
  openBlock,
  renderSlot,
  resolveComponent,
  toDisplayString,
  withCtx
} from "./chunk-QNGQRF5U.js";

// node_modules/primevue/password/password.esm.js
var script3 = {
  name: "Password",
  emits: ["update:modelValue", "change", "focus", "blur", "invalid"],
  props: {
    modelValue: String,
    promptLabel: {
      type: String,
      default: null
    },
    mediumRegex: {
      type: String,
      default: "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
      // eslint-disable-line
    },
    strongRegex: {
      type: String,
      default: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"
      // eslint-disable-line
    },
    weakLabel: {
      type: String,
      default: null
    },
    mediumLabel: {
      type: String,
      default: null
    },
    strongLabel: {
      type: String,
      default: null
    },
    feedback: {
      type: Boolean,
      default: true
    },
    appendTo: {
      type: String,
      default: "body"
    },
    toggleMask: {
      type: Boolean,
      default: false
    },
    hideIcon: {
      type: String,
      default: "pi pi-eye-slash"
    },
    showIcon: {
      type: String,
      default: "pi pi-eye"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    inputId: {
      type: String,
      default: null
    },
    inputClass: {
      type: [String, Object],
      default: null
    },
    inputStyle: {
      type: Object,
      default: null
    },
    inputProps: {
      type: null,
      default: null
    },
    panelId: {
      type: String,
      default: null
    },
    panelClass: {
      type: [String, Object],
      default: null
    },
    panelStyle: {
      type: Object,
      default: null
    },
    panelProps: {
      type: null,
      default: null
    },
    "aria-labelledby": {
      type: String,
      default: null
    },
    "aria-label": {
      type: String,
      default: null
    }
  },
  data() {
    return {
      overlayVisible: false,
      meter: null,
      infoText: null,
      focused: false,
      unmasked: false
    };
  },
  mediumCheckRegExp: null,
  strongCheckRegExp: null,
  resizeListener: null,
  scrollHandler: null,
  overlay: null,
  mounted() {
    this.infoText = this.promptText;
    this.mediumCheckRegExp = new RegExp(this.mediumRegex);
    this.strongCheckRegExp = new RegExp(this.strongRegex);
  },
  beforeUnmount() {
    this.unbindResizeListener();
    if (this.scrollHandler) {
      this.scrollHandler.destroy();
      this.scrollHandler = null;
    }
    if (this.overlay) {
      ZIndexUtils.clear(this.overlay);
      this.overlay = null;
    }
  },
  methods: {
    onOverlayEnter(el) {
      ZIndexUtils.set("overlay", el, this.$primevue.config.zIndex.overlay);
      this.alignOverlay();
      this.bindScrollListener();
      this.bindResizeListener();
    },
    onOverlayLeave() {
      this.unbindScrollListener();
      this.unbindResizeListener();
      this.overlay = null;
    },
    onOverlayAfterLeave(el) {
      ZIndexUtils.clear(el);
    },
    alignOverlay() {
      if (this.appendTo === "self") {
        DomHandler.relativePosition(this.overlay, this.$refs.input.$el);
      } else {
        this.overlay.style.minWidth = DomHandler.getOuterWidth(this.$refs.input.$el) + "px";
        DomHandler.absolutePosition(this.overlay, this.$refs.input.$el);
      }
    },
    testStrength(str) {
      let level = 0;
      if (this.strongCheckRegExp.test(str))
        level = 3;
      else if (this.mediumCheckRegExp.test(str))
        level = 2;
      else if (str.length)
        level = 1;
      return level;
    },
    onInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
    onFocus(event) {
      this.focused = true;
      if (this.feedback) {
        this.setPasswordMeter(this.modelValue);
        this.overlayVisible = true;
      }
      this.$emit("focus", event);
    },
    onBlur(event) {
      this.focused = false;
      if (this.feedback) {
        this.overlayVisible = false;
      }
      this.$emit("blur", event);
    },
    onKeyUp(event) {
      if (this.feedback) {
        const value = event.target.value;
        const { meter, label } = this.checkPasswordStrength(value);
        this.meter = meter;
        this.infoText = label;
        if (event.code === "Escape") {
          this.overlayVisible && (this.overlayVisible = false);
          return;
        }
        if (!this.overlayVisible) {
          this.overlayVisible = true;
        }
      }
    },
    setPasswordMeter() {
      if (!this.modelValue)
        return;
      const { meter, label } = this.checkPasswordStrength(this.modelValue);
      this.meter = meter;
      this.infoText = label;
      if (!this.overlayVisible) {
        this.overlayVisible = true;
      }
    },
    checkPasswordStrength(value) {
      let label = null;
      let meter = null;
      switch (this.testStrength(value)) {
        case 1:
          label = this.weakText;
          meter = {
            strength: "weak",
            width: "33.33%"
          };
          break;
        case 2:
          label = this.mediumText;
          meter = {
            strength: "medium",
            width: "66.66%"
          };
          break;
        case 3:
          label = this.strongText;
          meter = {
            strength: "strong",
            width: "100%"
          };
          break;
        default:
          label = this.promptText;
          meter = null;
          break;
      }
      return { label, meter };
    },
    onInvalid(event) {
      this.$emit("invalid", event);
    },
    bindScrollListener() {
      if (!this.scrollHandler) {
        this.scrollHandler = new ConnectedOverlayScrollHandler(this.$refs.input.$el, () => {
          if (this.overlayVisible) {
            this.overlayVisible = false;
          }
        });
      }
      this.scrollHandler.bindScrollListener();
    },
    unbindScrollListener() {
      if (this.scrollHandler) {
        this.scrollHandler.unbindScrollListener();
      }
    },
    bindResizeListener() {
      if (!this.resizeListener) {
        this.resizeListener = () => {
          if (this.overlayVisible && !DomHandler.isTouchDevice()) {
            this.overlayVisible = false;
          }
        };
        window.addEventListener("resize", this.resizeListener);
      }
    },
    unbindResizeListener() {
      if (this.resizeListener) {
        window.removeEventListener("resize", this.resizeListener);
        this.resizeListener = null;
      }
    },
    overlayRef(el) {
      this.overlay = el;
    },
    onMaskToggle() {
      this.unmasked = !this.unmasked;
    },
    onOverlayClick(event) {
      OverlayEventBus.emit("overlay-click", {
        originalEvent: event,
        target: this.$el
      });
    }
  },
  computed: {
    containerClass() {
      return [
        "p-password p-component p-inputwrapper",
        {
          "p-inputwrapper-filled": this.filled,
          "p-inputwrapper-focus": this.focused,
          "p-input-icon-right": this.toggleMask
        }
      ];
    },
    inputFieldClass() {
      return [
        "p-password-input",
        this.inputClass,
        {
          "p-disabled": this.disabled
        }
      ];
    },
    panelStyleClass() {
      return [
        "p-password-panel p-component",
        this.panelClass,
        {
          "p-input-filled": this.$primevue.config.inputStyle === "filled",
          "p-ripple-disabled": this.$primevue.config.ripple === false
        }
      ];
    },
    toggleIconClass() {
      return this.unmasked ? this.hideIcon : this.showIcon;
    },
    strengthClass() {
      return `p-password-strength ${this.meter ? this.meter.strength : ""}`;
    },
    inputType() {
      return this.unmasked ? "text" : "password";
    },
    filled() {
      return this.modelValue != null && this.modelValue.toString().length > 0;
    },
    weakText() {
      return this.weakLabel || this.$primevue.config.locale.weak;
    },
    mediumText() {
      return this.mediumLabel || this.$primevue.config.locale.medium;
    },
    strongText() {
      return this.strongLabel || this.$primevue.config.locale.strong;
    },
    promptText() {
      return this.promptLabel || this.$primevue.config.locale.passwordPrompt;
    },
    panelUniqueId() {
      return UniqueComponentId() + "_panel";
    }
  },
  components: {
    PInputText: script2,
    Portal: script
  }
};
var _hoisted_1 = {
  class: "p-hidden-accessible",
  "aria-live": "polite"
};
var _hoisted_2 = ["id"];
var _hoisted_3 = { class: "p-password-meter" };
var _hoisted_4 = { class: "p-password-info" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_PInputText = resolveComponent("PInputText");
  const _component_Portal = resolveComponent("Portal");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass($options.containerClass)
  }, [
    createVNode(_component_PInputText, mergeProps({
      ref: "input",
      id: $props.inputId,
      type: $options.inputType,
      class: $options.inputFieldClass,
      style: $props.inputStyle,
      value: $props.modelValue,
      "aria-labelledby": _ctx.ariaLabelledby,
      "aria-label": _ctx.ariaLabel,
      "aria-controls": $props.panelProps && $props.panelProps.id || $props.panelId || $options.panelUniqueId,
      "aria-expanded": $data.overlayVisible,
      "aria-haspopup": true,
      placeholder: $props.placeholder,
      required: $props.required,
      onInput: $options.onInput,
      onFocus: $options.onFocus,
      onBlur: $options.onBlur,
      onKeyup: $options.onKeyUp,
      onInvalid: $options.onInvalid
    }, $props.inputProps), null, 16, ["id", "type", "class", "style", "value", "aria-labelledby", "aria-label", "aria-controls", "aria-expanded", "placeholder", "required", "onInput", "onFocus", "onBlur", "onKeyup", "onInvalid"]),
    $props.toggleMask ? (openBlock(), createElementBlock("i", {
      key: 0,
      class: normalizeClass($options.toggleIconClass),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onMaskToggle && $options.onMaskToggle(...args))
    }, null, 2)) : createCommentVNode("", true),
    createBaseVNode("span", _hoisted_1, toDisplayString($data.infoText), 1),
    createVNode(_component_Portal, { appendTo: $props.appendTo }, {
      default: withCtx(() => [
        createVNode(Transition, {
          name: "p-connected-overlay",
          onEnter: $options.onOverlayEnter,
          onLeave: $options.onOverlayLeave,
          onAfterLeave: $options.onOverlayAfterLeave
        }, {
          default: withCtx(() => [
            $data.overlayVisible ? (openBlock(), createElementBlock("div", mergeProps({
              key: 0,
              ref: $options.overlayRef,
              id: $props.panelId || $options.panelUniqueId,
              class: $options.panelStyleClass,
              style: $props.panelStyle,
              onClick: _cache[1] || (_cache[1] = (...args) => $options.onOverlayClick && $options.onOverlayClick(...args))
            }, $props.panelProps), [
              renderSlot(_ctx.$slots, "header"),
              renderSlot(_ctx.$slots, "content", {}, () => [
                createBaseVNode("div", _hoisted_3, [
                  createBaseVNode("div", {
                    class: normalizeClass($options.strengthClass),
                    style: normalizeStyle({ width: $data.meter ? $data.meter.width : "" })
                  }, null, 6)
                ]),
                createBaseVNode("div", _hoisted_4, toDisplayString($data.infoText), 1)
              ]),
              renderSlot(_ctx.$slots, "footer")
            ], 16, _hoisted_2)) : createCommentVNode("", true)
          ]),
          _: 3
        }, 8, ["onEnter", "onLeave", "onAfterLeave"])
      ]),
      _: 3
    }, 8, ["appendTo"])
  ], 2);
}
function styleInject(css, ref) {
  if (ref === void 0)
    ref = {};
  var insertAt = ref.insertAt;
  if (!css || typeof document === "undefined") {
    return;
  }
  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}
var css_248z = "\n.p-password {\n    position: relative;\n    display: inline-flex;\n}\n.p-password-panel {\n    position: absolute;\n    top: 0;\n    left: 0;\n}\n.p-password .p-password-panel {\n    min-width: 100%;\n}\n.p-password-meter {\n    height: 10px;\n}\n.p-password-strength {\n    height: 100%;\n    width: 0;\n    transition: width 1s ease-in-out;\n}\n.p-fluid .p-password {\n    display: flex;\n}\n.p-password-input::-ms-reveal,\n.p-password-input::-ms-clear {\n    display: none;\n}\n";
styleInject(css_248z);
script3.render = render;
export {
  script3 as default
};
//# sourceMappingURL=primevue_password.js.map
