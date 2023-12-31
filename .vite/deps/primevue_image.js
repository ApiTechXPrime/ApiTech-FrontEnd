import {
  script
} from "./chunk-SJ2L5B2A.js";
import {
  DomHandler,
  ObjectUtils,
  ZIndexUtils
} from "./chunk-QKO2XLOI.js";
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
  resolveDirective,
  withCtx,
  withDirectives
} from "./chunk-QNGQRF5U.js";

// node_modules/primevue/focustrap/focustrap.esm.js
function bind(el, binding) {
  const { onFocusIn, onFocusOut } = binding.value || {};
  el.$_pfocustrap_mutationobserver = new MutationObserver((mutationList) => {
    mutationList.forEach((mutation) => {
      if (mutation.type === "childList" && !el.contains(document.activeElement)) {
        const findNextFocusableElement = (el2) => {
          const focusableElement = DomHandler.isFocusableElement(el2) ? el2 : DomHandler.getFirstFocusableElement(el2);
          return ObjectUtils.isNotEmpty(focusableElement) ? focusableElement : findNextFocusableElement(el2.nextSibling);
        };
        DomHandler.focus(findNextFocusableElement(mutation.nextSibling));
      }
    });
  });
  el.$_pfocustrap_mutationobserver.disconnect();
  el.$_pfocustrap_mutationobserver.observe(el, {
    childList: true
  });
  el.$_pfocustrap_focusinlistener = (event) => onFocusIn && onFocusIn(event);
  el.$_pfocustrap_focusoutlistener = (event) => onFocusOut && onFocusOut(event);
  el.addEventListener("focusin", el.$_pfocustrap_focusinlistener);
  el.addEventListener("focusout", el.$_pfocustrap_focusoutlistener);
}
function unbind(el) {
  el.$_pfocustrap_mutationobserver && el.$_pfocustrap_mutationobserver.disconnect();
  el.$_pfocustrap_focusinlistener && el.removeEventListener("focusin", el.$_pfocustrap_focusinlistener) && (el.$_pfocustrap_focusinlistener = null);
  el.$_pfocustrap_focusoutlistener && el.removeEventListener("focusout", el.$_pfocustrap_focusoutlistener) && (el.$_pfocustrap_focusoutlistener = null);
}
function autoFocus(el, binding) {
  const { autoFocusSelector = "", firstFocusableSelector = "", autoFocus: autoFocus2 = false } = binding.value || {};
  let focusableElement = DomHandler.getFirstFocusableElement(el, `[autofocus]:not(.p-hidden-focusable)${autoFocusSelector}`);
  autoFocus2 && !focusableElement && (focusableElement = DomHandler.getFirstFocusableElement(el, `:not(.p-hidden-focusable)${firstFocusableSelector}`));
  DomHandler.focus(focusableElement);
}
function onFirstHiddenElementFocus(event) {
  const { currentTarget, relatedTarget } = event;
  const focusableElement = relatedTarget === currentTarget.$_pfocustrap_lasthiddenfocusableelement ? DomHandler.getFirstFocusableElement(currentTarget.parentElement, `:not(.p-hidden-focusable)${currentTarget.$_pfocustrap_focusableselector}`) : currentTarget.$_pfocustrap_lasthiddenfocusableelement;
  DomHandler.focus(focusableElement);
}
function onLastHiddenElementFocus(event) {
  const { currentTarget, relatedTarget } = event;
  const focusableElement = relatedTarget === currentTarget.$_pfocustrap_firsthiddenfocusableelement ? DomHandler.getLastFocusableElement(currentTarget.parentElement, `:not(.p-hidden-focusable)${currentTarget.$_pfocustrap_focusableselector}`) : currentTarget.$_pfocustrap_firsthiddenfocusableelement;
  DomHandler.focus(focusableElement);
}
function createHiddenFocusableElements(el, binding) {
  const { tabIndex = 0, firstFocusableSelector = "", lastFocusableSelector = "" } = binding.value || {};
  const createFocusableElement = (onFocus) => {
    const element = document.createElement("span");
    element.classList = "p-hidden-accessible p-hidden-focusable";
    element.tabIndex = tabIndex;
    element.setAttribute("aria-hidden", "true");
    element.setAttribute("role", "presentation");
    element.addEventListener("focus", onFocus);
    return element;
  };
  const firstFocusableElement = createFocusableElement(onFirstHiddenElementFocus);
  const lastFocusableElement = createFocusableElement(onLastHiddenElementFocus);
  firstFocusableElement.$_pfocustrap_lasthiddenfocusableelement = lastFocusableElement;
  firstFocusableElement.$_pfocustrap_focusableselector = firstFocusableSelector;
  lastFocusableElement.$_pfocustrap_firsthiddenfocusableelement = firstFocusableElement;
  lastFocusableElement.$_pfocustrap_focusableselector = lastFocusableSelector;
  el.prepend(firstFocusableElement);
  el.append(lastFocusableElement);
}
var FocusTrap = {
  mounted(el, binding) {
    const { disabled } = binding.value || {};
    if (!disabled) {
      createHiddenFocusableElements(el, binding);
      bind(el, binding);
      autoFocus(el, binding);
    }
  },
  updated(el, binding) {
    const { disabled } = binding.value || {};
    disabled && unbind(el);
  },
  unmounted(el) {
    unbind(el);
  }
};

// node_modules/primevue/image/image.esm.js
var script2 = {
  name: "Image",
  inheritAttrs: false,
  emits: ["show", "hide", "error"],
  props: {
    preview: {
      type: Boolean,
      default: false
    },
    class: {
      type: null,
      default: null
    },
    style: {
      type: null,
      default: null
    },
    imageStyle: {
      type: null,
      default: null
    },
    imageClass: {
      type: null,
      default: null
    },
    previewButtonProps: {
      type: null,
      default: null
    },
    indicatorIcon: {
      type: String,
      default: "pi pi-eye"
    }
  },
  mask: null,
  data() {
    return {
      maskVisible: false,
      previewVisible: false,
      rotate: 0,
      scale: 1
    };
  },
  beforeUnmount() {
    if (this.mask) {
      ZIndexUtils.clear(this.container);
    }
  },
  methods: {
    maskRef(el) {
      this.mask = el;
    },
    toolbarRef(el) {
      this.toolbarRef = el;
    },
    onImageClick() {
      if (this.preview) {
        this.maskVisible = true;
        setTimeout(() => {
          this.previewVisible = true;
        }, 25);
      }
    },
    onPreviewImageClick() {
      this.previewClick = true;
    },
    onMaskClick() {
      if (!this.previewClick) {
        this.previewVisible = false;
        this.rotate = 0;
        this.scale = 1;
      }
      this.previewClick = false;
    },
    onMaskKeydown(event) {
      switch (event.code) {
        case "Escape":
          this.onMaskClick();
          setTimeout(() => {
            DomHandler.focus(this.$refs.previewButton);
          }, 25);
          event.preventDefault();
          break;
      }
    },
    onError() {
      this.$emit("error");
    },
    rotateRight() {
      this.rotate += 90;
      this.previewClick = true;
    },
    rotateLeft() {
      this.rotate -= 90;
      this.previewClick = true;
    },
    zoomIn() {
      this.scale = this.scale + 0.1;
      this.previewClick = true;
    },
    zoomOut() {
      this.scale = this.scale - 0.1;
      this.previewClick = true;
    },
    onBeforeEnter() {
      ZIndexUtils.set("modal", this.mask, this.$primevue.config.zIndex.modal);
    },
    onEnter() {
      this.focus();
      this.$emit("show");
    },
    onBeforeLeave() {
      DomHandler.addClass(this.mask, "p-component-overlay-leave");
    },
    onLeave() {
      this.$emit("hide");
    },
    onAfterLeave(el) {
      ZIndexUtils.clear(el);
      this.maskVisible = false;
    },
    focus() {
      let focusTarget = this.mask.querySelector("[autofocus]");
      if (focusTarget) {
        focusTarget.focus();
      }
    }
  },
  computed: {
    containerClass() {
      return [
        "p-image p-component",
        this.class,
        {
          "p-image-preview-container": this.preview
        }
      ];
    },
    maskClass() {
      return ["p-image-mask p-component-overlay p-component-overlay-enter"];
    },
    rotateClass() {
      return "p-image-preview-rotate-" + this.rotate;
    },
    imagePreviewStyle() {
      return { transform: "rotate(" + this.rotate + "deg) scale(" + this.scale + ")" };
    },
    zoomDisabled() {
      return this.scale <= 0.5 || this.scale >= 1.5;
    },
    rightAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.rotateRight : void 0;
    },
    leftAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.rotateLeft : void 0;
    },
    zoomInAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.zoomIn : void 0;
    },
    zoomOutAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.zoomOut : void 0;
    },
    closeAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.close : void 0;
    }
  },
  components: {
    Portal: script
  },
  directives: {
    focustrap: FocusTrap
  }
};
var _hoisted_1 = ["aria-modal"];
var _hoisted_2 = { class: "p-image-toolbar" };
var _hoisted_3 = ["aria-label"];
var _hoisted_4 = createBaseVNode("i", { class: "pi pi-refresh" }, null, -1);
var _hoisted_5 = ["aria-label"];
var _hoisted_6 = createBaseVNode("i", { class: "pi pi-undo" }, null, -1);
var _hoisted_7 = ["disabled", "aria-label"];
var _hoisted_8 = createBaseVNode("i", { class: "pi pi-search-minus" }, null, -1);
var _hoisted_9 = ["disabled", "aria-label"];
var _hoisted_10 = createBaseVNode("i", { class: "pi pi-search-plus" }, null, -1);
var _hoisted_11 = ["aria-label"];
var _hoisted_12 = createBaseVNode("i", { class: "pi pi-times" }, null, -1);
var _hoisted_13 = { key: 0 };
var _hoisted_14 = ["src"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Portal = resolveComponent("Portal");
  const _directive_focustrap = resolveDirective("focustrap");
  return openBlock(), createElementBlock("span", {
    class: normalizeClass($options.containerClass),
    style: normalizeStyle($props.style)
  }, [
    createBaseVNode("img", mergeProps(_ctx.$attrs, {
      style: $props.imageStyle,
      class: $props.imageClass,
      onError: _cache[0] || (_cache[0] = (...args) => $options.onError && $options.onError(...args))
    }), null, 16),
    $props.preview ? (openBlock(), createElementBlock("button", mergeProps({
      key: 0,
      ref: "previewButton",
      class: "p-image-preview-indicator",
      onClick: _cache[1] || (_cache[1] = (...args) => $options.onImageClick && $options.onImageClick(...args))
    }, $props.previewButtonProps), [
      renderSlot(_ctx.$slots, "indicator", {}, () => [
        createBaseVNode("i", {
          class: normalizeClass(["p-image-preview-icon", $props.indicatorIcon])
        }, null, 2)
      ])
    ], 16)) : createCommentVNode("", true),
    createVNode(_component_Portal, null, {
      default: withCtx(() => [
        $data.maskVisible ? withDirectives((openBlock(), createElementBlock("div", {
          key: 0,
          ref: $options.maskRef,
          role: "dialog",
          class: normalizeClass($options.maskClass),
          "aria-modal": $data.maskVisible,
          onClick: _cache[8] || (_cache[8] = (...args) => $options.onMaskClick && $options.onMaskClick(...args)),
          onKeydown: _cache[9] || (_cache[9] = (...args) => $options.onMaskKeydown && $options.onMaskKeydown(...args))
        }, [
          createBaseVNode("div", _hoisted_2, [
            createBaseVNode("button", {
              class: "p-image-action p-link",
              onClick: _cache[2] || (_cache[2] = (...args) => $options.rotateRight && $options.rotateRight(...args)),
              type: "button",
              "aria-label": $options.rightAriaLabel
            }, [
              renderSlot(_ctx.$slots, "refresh", {}, () => [
                _hoisted_4
              ])
            ], 8, _hoisted_3),
            createBaseVNode("button", {
              class: "p-image-action p-link",
              onClick: _cache[3] || (_cache[3] = (...args) => $options.rotateLeft && $options.rotateLeft(...args)),
              type: "button",
              "aria-label": $options.leftAriaLabel
            }, [
              renderSlot(_ctx.$slots, "undo", {}, () => [
                _hoisted_6
              ])
            ], 8, _hoisted_5),
            createBaseVNode("button", {
              class: "p-image-action p-link",
              onClick: _cache[4] || (_cache[4] = (...args) => $options.zoomOut && $options.zoomOut(...args)),
              type: "button",
              disabled: $options.zoomDisabled,
              "aria-label": $options.zoomOutAriaLabel
            }, [
              renderSlot(_ctx.$slots, "zoomout", {}, () => [
                _hoisted_8
              ])
            ], 8, _hoisted_7),
            createBaseVNode("button", {
              class: "p-image-action p-link",
              onClick: _cache[5] || (_cache[5] = (...args) => $options.zoomIn && $options.zoomIn(...args)),
              type: "button",
              disabled: $options.zoomDisabled,
              "aria-label": $options.zoomInAriaLabel
            }, [
              renderSlot(_ctx.$slots, "zoomin", {}, () => [
                _hoisted_10
              ])
            ], 8, _hoisted_9),
            createBaseVNode("button", {
              class: "p-image-action p-link",
              type: "button",
              onClick: _cache[6] || (_cache[6] = (...args) => _ctx.hidePreview && _ctx.hidePreview(...args)),
              "aria-label": $options.closeAriaLabel,
              autofocus: ""
            }, [
              renderSlot(_ctx.$slots, "close", {}, () => [
                _hoisted_12
              ])
            ], 8, _hoisted_11)
          ]),
          createVNode(Transition, {
            name: "p-image-preview",
            onBeforeEnter: $options.onBeforeEnter,
            onEnter: $options.onEnter,
            onLeave: $options.onLeave,
            onBeforeLeave: $options.onBeforeLeave,
            onAfterLeave: $options.onAfterLeave
          }, {
            default: withCtx(() => [
              $data.previewVisible ? (openBlock(), createElementBlock("div", _hoisted_13, [
                createBaseVNode("img", {
                  src: _ctx.$attrs.src,
                  class: "p-image-preview",
                  style: normalizeStyle($options.imagePreviewStyle),
                  onClick: _cache[7] || (_cache[7] = (...args) => $options.onPreviewImageClick && $options.onPreviewImageClick(...args))
                }, null, 12, _hoisted_14)
              ])) : createCommentVNode("", true)
            ]),
            _: 1
          }, 8, ["onBeforeEnter", "onEnter", "onLeave", "onBeforeLeave", "onAfterLeave"])
        ], 42, _hoisted_1)), [
          [_directive_focustrap]
        ]) : createCommentVNode("", true)
      ]),
      _: 3
    })
  ], 6);
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
var css_248z = "\n.p-image-mask {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n.p-image-preview-container {\n    position: relative;\n    display: inline-block;\n}\n.p-image-preview-indicator {\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    opacity: 0;\n    transition: opacity 0.3s;\n}\n.p-image-preview-icon {\n    font-size: 1.5rem;\n}\n.p-image-preview-container:hover > .p-image-preview-indicator {\n    opacity: 1;\n    cursor: pointer;\n}\n.p-image-preview-container > img {\n    cursor: pointer;\n}\n.p-image-toolbar {\n    position: absolute;\n    top: 0;\n    right: 0;\n    display: flex;\n}\n.p-image-action.p-link {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n.p-image-preview {\n    transition: transform 0.15s;\n    max-width: 100vw;\n    max-height: 100vh;\n}\n.p-image-preview-enter-active {\n    transition: all 150ms cubic-bezier(0, 0, 0.2, 1);\n}\n.p-image-preview-leave-active {\n    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.p-image-preview-enter-from,\n.p-image-preview-leave-to {\n    opacity: 0;\n    transform: scale(0.7);\n}\n";
styleInject(css_248z);
script2.render = render;
export {
  script2 as default
};
//# sourceMappingURL=primevue_image.js.map
