import {
  OverlayEventBus
} from "./chunk-ZKQJQZRH.js";
import {
  FilterService
} from "./chunk-VMQEQLCD.js";
import {
  script
} from "./chunk-SJ2L5B2A.js";
import {
  Ripple
} from "./chunk-NRGSJGES.js";
import {
  ConnectedOverlayScrollHandler,
  DomHandler,
  ObjectUtils,
  UniqueComponentId,
  ZIndexUtils
} from "./chunk-QKO2XLOI.js";
import {
  Fragment,
  Transition,
  createBaseVNode,
  createCommentVNode,
  createElementBlock,
  createSlots,
  createTextVNode,
  createVNode,
  mergeProps,
  normalizeClass,
  normalizeStyle,
  openBlock,
  renderList,
  renderSlot,
  resolveComponent,
  resolveDirective,
  toDisplayString,
  withCtx,
  withDirectives
} from "./chunk-QNGQRF5U.js";

// node_modules/primevue/virtualscroller/virtualscroller.esm.js
var script2 = {
  name: "VirtualScroller",
  emits: ["update:numToleratedItems", "scroll", "scroll-index-change", "lazy-load"],
  props: {
    id: {
      type: String,
      default: null
    },
    style: null,
    class: null,
    items: {
      type: Array,
      default: null
    },
    itemSize: {
      type: [Number, Array],
      default: 0
    },
    scrollHeight: null,
    scrollWidth: null,
    orientation: {
      type: String,
      default: "vertical"
    },
    numToleratedItems: {
      type: Number,
      default: null
    },
    delay: {
      type: Number,
      default: 0
    },
    resizeDelay: {
      type: Number,
      default: 10
    },
    lazy: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loaderDisabled: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    showSpacer: {
      type: Boolean,
      default: true
    },
    showLoader: {
      type: Boolean,
      default: false
    },
    tabindex: {
      type: Number,
      default: 0
    },
    inline: {
      type: Boolean,
      default: false
    },
    step: {
      type: Number,
      default: 0
    },
    appendOnly: {
      type: Boolean,
      default: false
    },
    autoSize: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      first: this.isBoth() ? { rows: 0, cols: 0 } : 0,
      last: this.isBoth() ? { rows: 0, cols: 0 } : 0,
      page: this.isBoth() ? { rows: 0, cols: 0 } : 0,
      numItemsInViewport: this.isBoth() ? { rows: 0, cols: 0 } : 0,
      lastScrollPos: this.isBoth() ? { top: 0, left: 0 } : 0,
      d_numToleratedItems: this.numToleratedItems,
      d_loading: this.loading,
      loaderArr: [],
      spacerStyle: {},
      contentStyle: {}
    };
  },
  element: null,
  content: null,
  lastScrollPos: null,
  scrollTimeout: null,
  resizeTimeout: null,
  defaultWidth: 0,
  defaultHeight: 0,
  defaultContentWidth: 0,
  defaultContentHeight: 0,
  isRangeChanged: false,
  lazyLoadState: {},
  resizeListener: null,
  initialized: false,
  watch: {
    numToleratedItems(newValue) {
      this.d_numToleratedItems = newValue;
    },
    loading(newValue) {
      this.d_loading = newValue;
    },
    items(newValue, oldValue) {
      if (!oldValue || oldValue.length !== (newValue || []).length) {
        this.init();
        this.calculateAutoSize();
      }
    },
    itemSize() {
      this.init();
      this.calculateAutoSize();
    },
    orientation() {
      this.lastScrollPos = this.isBoth() ? { top: 0, left: 0 } : 0;
    },
    scrollHeight() {
      this.init();
      this.calculateAutoSize();
    },
    scrollWidth() {
      this.init();
      this.calculateAutoSize();
    }
  },
  mounted() {
    this.viewInit();
    this.lastScrollPos = this.isBoth() ? { top: 0, left: 0 } : 0;
    this.lazyLoadState = this.lazyLoadState || {};
  },
  updated() {
    !this.initialized && this.viewInit();
  },
  unmounted() {
    this.unbindResizeListener();
    this.initialized = false;
  },
  methods: {
    viewInit() {
      if (DomHandler.isVisible(this.element)) {
        this.setContentEl(this.content);
        this.init();
        this.bindResizeListener();
        this.defaultWidth = DomHandler.getWidth(this.element);
        this.defaultHeight = DomHandler.getHeight(this.element);
        this.defaultContentWidth = DomHandler.getWidth(this.content);
        this.defaultContentHeight = DomHandler.getHeight(this.content);
        this.initialized = true;
      }
    },
    init() {
      if (!this.disabled) {
        this.setSize();
        this.calculateOptions();
        this.setSpacerSize();
      }
    },
    isVertical() {
      return this.orientation === "vertical";
    },
    isHorizontal() {
      return this.orientation === "horizontal";
    },
    isBoth() {
      return this.orientation === "both";
    },
    scrollTo(options) {
      this.lastScrollPos = this.both ? { top: 0, left: 0 } : 0;
      this.element && this.element.scrollTo(options);
    },
    scrollToIndex(index, behavior = "auto") {
      const both = this.isBoth();
      const horizontal = this.isHorizontal();
      const first = this.first;
      const { numToleratedItems } = this.calculateNumItems();
      const contentPos = this.getContentPosition();
      const itemSize = this.itemSize;
      const calculateFirst = (_index = 0, _numT) => _index <= _numT ? 0 : _index;
      const calculateCoord = (_first, _size, _cpos) => _first * _size + _cpos;
      const scrollTo = (left = 0, top = 0) => this.scrollTo({ left, top, behavior });
      let newFirst = both ? { rows: 0, cols: 0 } : 0;
      let isRangeChanged = false;
      if (both) {
        newFirst = { rows: calculateFirst(index[0], numToleratedItems[0]), cols: calculateFirst(index[1], numToleratedItems[1]) };
        scrollTo(calculateCoord(newFirst.cols, itemSize[1], contentPos.left), calculateCoord(newFirst.rows, itemSize[0], contentPos.top));
        isRangeChanged = newFirst.rows !== first.rows || newFirst.cols !== first.cols;
      } else {
        newFirst = calculateFirst(index, numToleratedItems);
        horizontal ? scrollTo(calculateCoord(newFirst, itemSize, contentPos.left), 0) : scrollTo(0, calculateCoord(newFirst, itemSize, contentPos.top));
        isRangeChanged = newFirst !== first;
      }
      this.isRangeChanged = isRangeChanged;
      this.first = newFirst;
    },
    scrollInView(index, to, behavior = "auto") {
      if (to) {
        const both = this.isBoth();
        const horizontal = this.isHorizontal();
        const { first, viewport } = this.getRenderedRange();
        const scrollTo = (left = 0, top = 0) => this.scrollTo({ left, top, behavior });
        const isToStart = to === "to-start";
        const isToEnd = to === "to-end";
        if (isToStart) {
          if (both) {
            if (viewport.first.rows - first.rows > index[0]) {
              scrollTo(viewport.first.cols * this.itemSize[1], (viewport.first.rows - 1) * this.itemSize[0]);
            } else if (viewport.first.cols - first.cols > index[1]) {
              scrollTo((viewport.first.cols - 1) * this.itemSize[1], viewport.first.rows * this.itemSize[0]);
            }
          } else {
            if (viewport.first - first > index) {
              const pos = (viewport.first - 1) * this.itemSize;
              horizontal ? scrollTo(pos, 0) : scrollTo(0, pos);
            }
          }
        } else if (isToEnd) {
          if (both) {
            if (viewport.last.rows - first.rows <= index[0] + 1) {
              scrollTo(viewport.first.cols * this.itemSize[1], (viewport.first.rows + 1) * this.itemSize[0]);
            } else if (viewport.last.cols - first.cols <= index[1] + 1) {
              scrollTo((viewport.first.cols + 1) * this.itemSize[1], viewport.first.rows * this.itemSize[0]);
            }
          } else {
            if (viewport.last - first <= index + 1) {
              const pos = (viewport.first + 1) * this.itemSize;
              horizontal ? scrollTo(pos, 0) : scrollTo(0, pos);
            }
          }
        }
      } else {
        this.scrollToIndex(index, behavior);
      }
    },
    getRenderedRange() {
      const calculateFirstInViewport = (_pos, _size) => Math.floor(_pos / (_size || _pos));
      let firstInViewport = this.first;
      let lastInViewport = 0;
      if (this.element) {
        const both = this.isBoth();
        const horizontal = this.isHorizontal();
        const { scrollTop, scrollLeft } = this.element.scrollTop;
        if (both) {
          firstInViewport = { rows: calculateFirstInViewport(scrollTop, this.itemSize[0]), cols: calculateFirstInViewport(scrollLeft, this.itemSize[1]) };
          lastInViewport = { rows: firstInViewport.rows + this.numItemsInViewport.rows, cols: firstInViewport.cols + this.numItemsInViewport.cols };
        } else {
          const scrollPos = horizontal ? scrollLeft : scrollTop;
          firstInViewport = calculateFirstInViewport(scrollPos, this.itemSize);
          lastInViewport = firstInViewport + this.numItemsInViewport;
        }
      }
      return {
        first: this.first,
        last: this.last,
        viewport: {
          first: firstInViewport,
          last: lastInViewport
        }
      };
    },
    calculateNumItems() {
      const both = this.isBoth();
      const horizontal = this.isHorizontal();
      const itemSize = this.itemSize;
      const contentPos = this.getContentPosition();
      const contentWidth = this.element ? this.element.offsetWidth - contentPos.left : 0;
      const contentHeight = this.element ? this.element.offsetHeight - contentPos.top : 0;
      const calculateNumItemsInViewport = (_contentSize, _itemSize) => Math.ceil(_contentSize / (_itemSize || _contentSize));
      const calculateNumToleratedItems = (_numItems) => Math.ceil(_numItems / 2);
      const numItemsInViewport = both ? { rows: calculateNumItemsInViewport(contentHeight, itemSize[0]), cols: calculateNumItemsInViewport(contentWidth, itemSize[1]) } : calculateNumItemsInViewport(horizontal ? contentWidth : contentHeight, itemSize);
      const numToleratedItems = this.d_numToleratedItems || (both ? [calculateNumToleratedItems(numItemsInViewport.rows), calculateNumToleratedItems(numItemsInViewport.cols)] : calculateNumToleratedItems(numItemsInViewport));
      return { numItemsInViewport, numToleratedItems };
    },
    calculateOptions() {
      const both = this.isBoth();
      const first = this.first;
      const { numItemsInViewport, numToleratedItems } = this.calculateNumItems();
      const calculateLast = (_first, _num, _numT, _isCols = false) => this.getLast(_first + _num + (_first < _numT ? 2 : 3) * _numT, _isCols);
      const last = both ? { rows: calculateLast(first.rows, numItemsInViewport.rows, numToleratedItems[0]), cols: calculateLast(first.cols, numItemsInViewport.cols, numToleratedItems[1], true) } : calculateLast(first, numItemsInViewport, numToleratedItems);
      this.last = last;
      this.numItemsInViewport = numItemsInViewport;
      this.d_numToleratedItems = numToleratedItems;
      this.$emit("update:numToleratedItems", this.d_numToleratedItems);
      if (this.showLoader) {
        this.loaderArr = both ? Array.from({ length: numItemsInViewport.rows }).map(() => Array.from({ length: numItemsInViewport.cols })) : Array.from({ length: numItemsInViewport });
      }
      if (this.lazy) {
        Promise.resolve().then(() => {
          this.lazyLoadState = {
            first: this.step ? both ? { rows: 0, cols: first.cols } : 0 : first,
            last: Math.min(this.step ? this.step : last, this.items.length)
          };
          this.$emit("lazy-load", this.lazyLoadState);
        });
      }
    },
    calculateAutoSize() {
      if (this.autoSize && !this.d_loading) {
        Promise.resolve().then(() => {
          if (this.content) {
            const both = this.isBoth();
            const horizontal = this.isHorizontal();
            const vertical = this.isVertical();
            this.content.style.minHeight = this.content.style.minWidth = "auto";
            this.content.style.position = "relative";
            this.element.style.contain = "none";
            const [contentWidth, contentHeight] = [DomHandler.getWidth(this.content), DomHandler.getHeight(this.content)];
            contentWidth !== this.defaultContentWidth && (this.element.style.width = "");
            contentHeight !== this.defaultContentHeight && (this.element.style.height = "");
            const [width, height] = [DomHandler.getWidth(this.element), DomHandler.getHeight(this.element)];
            (both || horizontal) && (this.element.style.width = width < this.defaultWidth ? width + "px" : this.scrollWidth || this.defaultWidth + "px");
            (both || vertical) && (this.element.style.height = height < this.defaultHeight ? height + "px" : this.scrollHeight || this.defaultHeight + "px");
            this.content.style.minHeight = this.content.style.minWidth = "";
            this.content.style.position = "";
            this.element.style.contain = "";
          }
        });
      }
    },
    getLast(last = 0, isCols) {
      return this.items ? Math.min(isCols ? (this.columns || this.items[0]).length : this.items.length, last) : 0;
    },
    getContentPosition() {
      if (this.content) {
        const style = getComputedStyle(this.content);
        const left = parseFloat(style.paddingLeft) + Math.max(parseFloat(style.left) || 0, 0);
        const right = parseFloat(style.paddingRight) + Math.max(parseFloat(style.right) || 0, 0);
        const top = parseFloat(style.paddingTop) + Math.max(parseFloat(style.top) || 0, 0);
        const bottom = parseFloat(style.paddingBottom) + Math.max(parseFloat(style.bottom) || 0, 0);
        return { left, right, top, bottom, x: left + right, y: top + bottom };
      }
      return { left: 0, right: 0, top: 0, bottom: 0, x: 0, y: 0 };
    },
    setSize() {
      if (this.element) {
        const both = this.isBoth();
        const horizontal = this.isHorizontal();
        const parentElement = this.element.parentElement;
        const width = this.scrollWidth || `${this.element.offsetWidth || parentElement.offsetWidth}px`;
        const height = this.scrollHeight || `${this.element.offsetHeight || parentElement.offsetHeight}px`;
        const setProp = (_name, _value) => this.element.style[_name] = _value;
        if (both || horizontal) {
          setProp("height", height);
          setProp("width", width);
        } else {
          setProp("height", height);
        }
      }
    },
    setSpacerSize() {
      const items = this.items;
      if (items) {
        const both = this.isBoth();
        const horizontal = this.isHorizontal();
        const contentPos = this.getContentPosition();
        const setProp = (_name, _value, _size, _cpos = 0) => this.spacerStyle = { ...this.spacerStyle, ...{ [`${_name}`]: (_value || []).length * _size + _cpos + "px" } };
        if (both) {
          setProp("height", items, this.itemSize[0], contentPos.y);
          setProp("width", this.columns || items[1], this.itemSize[1], contentPos.x);
        } else {
          horizontal ? setProp("width", this.columns || items, this.itemSize, contentPos.x) : setProp("height", items, this.itemSize, contentPos.y);
        }
      }
    },
    setContentPosition(pos) {
      if (this.content && !this.appendOnly) {
        const both = this.isBoth();
        const horizontal = this.isHorizontal();
        const first = pos ? pos.first : this.first;
        const calculateTranslateVal = (_first, _size) => _first * _size;
        const setTransform = (_x = 0, _y = 0) => this.contentStyle = { ...this.contentStyle, ...{ transform: `translate3d(${_x}px, ${_y}px, 0)` } };
        if (both) {
          setTransform(calculateTranslateVal(first.cols, this.itemSize[1]), calculateTranslateVal(first.rows, this.itemSize[0]));
        } else {
          const translateVal = calculateTranslateVal(first, this.itemSize);
          horizontal ? setTransform(translateVal, 0) : setTransform(0, translateVal);
        }
      }
    },
    onScrollPositionChange(event) {
      const target = event.target;
      const both = this.isBoth();
      const horizontal = this.isHorizontal();
      const contentPos = this.getContentPosition();
      const calculateScrollPos = (_pos, _cpos) => _pos ? _pos > _cpos ? _pos - _cpos : _pos : 0;
      const calculateCurrentIndex = (_pos, _size) => Math.floor(_pos / (_size || _pos));
      const calculateTriggerIndex = (_currentIndex, _first, _last, _num, _numT, _isScrollDownOrRight) => {
        return _currentIndex <= _numT ? _numT : _isScrollDownOrRight ? _last - _num - _numT : _first + _numT - 1;
      };
      const calculateFirst = (_currentIndex, _triggerIndex, _first, _last, _num, _numT, _isScrollDownOrRight) => {
        if (_currentIndex <= _numT)
          return 0;
        else
          return Math.max(0, _isScrollDownOrRight ? _currentIndex < _triggerIndex ? _first : _currentIndex - _numT : _currentIndex > _triggerIndex ? _first : _currentIndex - 2 * _numT);
      };
      const calculateLast = (_currentIndex, _first, _last, _num, _numT, _isCols) => {
        let lastValue = _first + _num + 2 * _numT;
        if (_currentIndex >= _numT) {
          lastValue += _numT + 1;
        }
        return this.getLast(lastValue, _isCols);
      };
      const scrollTop = calculateScrollPos(target.scrollTop, contentPos.top);
      const scrollLeft = calculateScrollPos(target.scrollLeft, contentPos.left);
      let newFirst = both ? { rows: 0, cols: 0 } : 0;
      let newLast = this.last;
      let isRangeChanged = false;
      let newScrollPos = this.lastScrollPos;
      if (both) {
        const isScrollDown = this.lastScrollPos.top <= scrollTop;
        const isScrollRight = this.lastScrollPos.left <= scrollLeft;
        if (!this.appendOnly || this.appendOnly && (isScrollDown || isScrollRight)) {
          const currentIndex = { rows: calculateCurrentIndex(scrollTop, this.itemSize[0]), cols: calculateCurrentIndex(scrollLeft, this.itemSize[1]) };
          const triggerIndex = {
            rows: calculateTriggerIndex(currentIndex.rows, this.first.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0], isScrollDown),
            cols: calculateTriggerIndex(currentIndex.cols, this.first.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], isScrollRight)
          };
          newFirst = {
            rows: calculateFirst(currentIndex.rows, triggerIndex.rows, this.first.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0], isScrollDown),
            cols: calculateFirst(currentIndex.cols, triggerIndex.cols, this.first.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], isScrollRight)
          };
          newLast = {
            rows: calculateLast(currentIndex.rows, newFirst.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0]),
            cols: calculateLast(currentIndex.cols, newFirst.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], true)
          };
          isRangeChanged = newFirst.rows !== this.first.rows || newLast.rows !== this.last.rows || newFirst.cols !== this.first.cols || newLast.cols !== this.last.cols || this.isRangeChanged;
          newScrollPos = { top: scrollTop, left: scrollLeft };
        }
      } else {
        const scrollPos = horizontal ? scrollLeft : scrollTop;
        const isScrollDownOrRight = this.lastScrollPos <= scrollPos;
        if (!this.appendOnly || this.appendOnly && isScrollDownOrRight) {
          const currentIndex = calculateCurrentIndex(scrollPos, this.itemSize);
          const triggerIndex = calculateTriggerIndex(currentIndex, this.first, this.last, this.numItemsInViewport, this.d_numToleratedItems, isScrollDownOrRight);
          newFirst = calculateFirst(currentIndex, triggerIndex, this.first, this.last, this.numItemsInViewport, this.d_numToleratedItems, isScrollDownOrRight);
          newLast = calculateLast(currentIndex, newFirst, this.last, this.numItemsInViewport, this.d_numToleratedItems);
          isRangeChanged = newFirst !== this.first || newLast !== this.last || this.isRangeChanged;
          newScrollPos = scrollPos;
        }
      }
      return {
        first: newFirst,
        last: newLast,
        isRangeChanged,
        scrollPos: newScrollPos
      };
    },
    onScrollChange(event) {
      const { first, last, isRangeChanged, scrollPos } = this.onScrollPositionChange(event);
      if (isRangeChanged) {
        const newState = { first, last };
        this.setContentPosition(newState);
        this.first = first;
        this.last = last;
        this.lastScrollPos = scrollPos;
        this.$emit("scroll-index-change", newState);
        if (this.lazy && this.isPageChanged(first)) {
          const lazyLoadState = {
            first: this.step ? Math.min(this.getPageByFirst(first) * this.step, this.items.length - this.step) : first,
            last: Math.min(this.step ? (this.getPageByFirst(first) + 1) * this.step : last, this.items.length)
          };
          const isLazyStateChanged = this.lazyLoadState.first !== lazyLoadState.first || this.lazyLoadState.last !== lazyLoadState.last;
          isLazyStateChanged && this.$emit("lazy-load", lazyLoadState);
          this.lazyLoadState = lazyLoadState;
        }
      }
    },
    onScroll(event) {
      this.$emit("scroll", event);
      if (this.delay && this.isPageChanged()) {
        if (this.scrollTimeout) {
          clearTimeout(this.scrollTimeout);
        }
        if (!this.d_loading && this.showLoader) {
          const { isRangeChanged } = this.onScrollPositionChange(event);
          const changed = isRangeChanged || (this.step ? this.isPageChanged() : false);
          changed && (this.d_loading = true);
        }
        this.scrollTimeout = setTimeout(() => {
          this.onScrollChange(event);
          if (this.d_loading && this.showLoader && (!this.lazy || this.loading === void 0)) {
            this.d_loading = false;
            this.page = this.getPageByFirst();
          }
        }, this.delay);
      } else {
        this.onScrollChange(event);
      }
    },
    onResize() {
      if (this.resizeTimeout) {
        clearTimeout(this.resizeTimeout);
      }
      this.resizeTimeout = setTimeout(() => {
        if (DomHandler.isVisible(this.element)) {
          const both = this.isBoth();
          const vertical = this.isVertical();
          const horizontal = this.isHorizontal();
          const [width, height] = [DomHandler.getWidth(this.element), DomHandler.getHeight(this.element)];
          const [isDiffWidth, isDiffHeight] = [width !== this.defaultWidth, height !== this.defaultHeight];
          const reinit = both ? isDiffWidth || isDiffHeight : horizontal ? isDiffWidth : vertical ? isDiffHeight : false;
          if (reinit) {
            this.d_numToleratedItems = this.numToleratedItems;
            this.defaultWidth = width;
            this.defaultHeight = height;
            this.defaultContentWidth = DomHandler.getWidth(this.content);
            this.defaultContentHeight = DomHandler.getHeight(this.content);
            this.init();
          }
        }
      }, this.resizeDelay);
    },
    bindResizeListener() {
      if (!this.resizeListener) {
        this.resizeListener = this.onResize.bind(this);
        window.addEventListener("resize", this.resizeListener);
        window.addEventListener("orientationchange", this.resizeListener);
      }
    },
    unbindResizeListener() {
      if (this.resizeListener) {
        window.removeEventListener("resize", this.resizeListener);
        window.removeEventListener("orientationchange", this.resizeListener);
        this.resizeListener = null;
      }
    },
    getOptions(renderedIndex) {
      const count = (this.items || []).length;
      const index = this.isBoth() ? this.first.rows + renderedIndex : this.first + renderedIndex;
      return {
        index,
        count,
        first: index === 0,
        last: index === count - 1,
        even: index % 2 === 0,
        odd: index % 2 !== 0
      };
    },
    getLoaderOptions(index, extOptions) {
      let count = this.loaderArr.length;
      return {
        index,
        count,
        first: index === 0,
        last: index === count - 1,
        even: index % 2 === 0,
        odd: index % 2 !== 0,
        ...extOptions
      };
    },
    getPageByFirst(first) {
      return Math.floor(((first ?? this.first) + this.d_numToleratedItems * 4) / (this.step || 1));
    },
    isPageChanged(first) {
      return this.step ? this.page !== this.getPageByFirst(first ?? this.first) : true;
    },
    setContentEl(el) {
      this.content = el || this.content || DomHandler.findSingle(this.element, ".p-virtualscroller-content");
    },
    elementRef(el) {
      this.element = el;
    },
    contentRef(el) {
      this.content = el;
    }
  },
  computed: {
    containerClass() {
      return [
        "p-virtualscroller",
        {
          "p-virtualscroller-inline": this.inline,
          "p-virtualscroller-both p-both-scroll": this.isBoth(),
          "p-virtualscroller-horizontal p-horizontal-scroll": this.isHorizontal()
        },
        this.class
      ];
    },
    contentClass() {
      return [
        "p-virtualscroller-content",
        {
          "p-virtualscroller-loading": this.d_loading
        }
      ];
    },
    loaderClass() {
      return [
        "p-virtualscroller-loader",
        {
          "p-component-overlay": !this.$slots.loader
        }
      ];
    },
    loadedItems() {
      if (this.items && !this.d_loading) {
        if (this.isBoth())
          return this.items.slice(this.appendOnly ? 0 : this.first.rows, this.last.rows).map((item) => this.columns ? item : item.slice(this.appendOnly ? 0 : this.first.cols, this.last.cols));
        else if (this.isHorizontal() && this.columns)
          return this.items;
        else
          return this.items.slice(this.appendOnly ? 0 : this.first, this.last);
      }
      return [];
    },
    loadedRows() {
      return this.d_loading ? this.loaderDisabled ? this.loaderArr : [] : this.loadedItems;
    },
    loadedColumns() {
      if (this.columns) {
        const both = this.isBoth();
        const horizontal = this.isHorizontal();
        if (both || horizontal) {
          return this.d_loading && this.loaderDisabled ? both ? this.loaderArr[0] : this.loaderArr : this.columns.slice(both ? this.first.cols : this.first, both ? this.last.cols : this.last);
        }
      }
      return this.columns;
    }
  }
};
var _hoisted_1 = ["tabindex"];
var _hoisted_2 = {
  key: 1,
  class: "p-virtualscroller-loading-icon pi pi-spinner pi-spin"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return !$props.disabled ? (openBlock(), createElementBlock("div", {
    key: 0,
    ref: $options.elementRef,
    class: normalizeClass($options.containerClass),
    tabindex: $props.tabindex,
    style: normalizeStyle($props.style),
    onScroll: _cache[0] || (_cache[0] = (...args) => $options.onScroll && $options.onScroll(...args))
  }, [
    renderSlot(_ctx.$slots, "content", {
      styleClass: $options.contentClass,
      items: $options.loadedItems,
      getItemOptions: $options.getOptions,
      loading: $data.d_loading,
      getLoaderOptions: $options.getLoaderOptions,
      itemSize: $props.itemSize,
      rows: $options.loadedRows,
      columns: $options.loadedColumns,
      contentRef: $options.contentRef,
      spacerStyle: $data.spacerStyle,
      contentStyle: $data.contentStyle,
      vertical: $options.isVertical(),
      horizontal: $options.isHorizontal(),
      both: $options.isBoth()
    }, () => [
      createBaseVNode("div", {
        ref: $options.contentRef,
        class: normalizeClass($options.contentClass),
        style: normalizeStyle($data.contentStyle)
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($options.loadedItems, (item, index) => {
          return renderSlot(_ctx.$slots, "item", {
            key: index,
            item,
            options: $options.getOptions(index)
          });
        }), 128))
      ], 6)
    ]),
    $props.showSpacer ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: "p-virtualscroller-spacer",
      style: normalizeStyle($data.spacerStyle)
    }, null, 4)) : createCommentVNode("", true),
    !$props.loaderDisabled && $props.showLoader && $data.d_loading ? (openBlock(), createElementBlock("div", {
      key: 1,
      class: normalizeClass($options.loaderClass)
    }, [
      _ctx.$slots && _ctx.$slots.loader ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList($data.loaderArr, (_, index) => {
        return renderSlot(_ctx.$slots, "loader", {
          key: index,
          options: $options.getLoaderOptions(index, $options.isBoth() && { numCols: _ctx.d_numItemsInViewport.cols })
        });
      }), 128)) : (openBlock(), createElementBlock("i", _hoisted_2))
    ], 2)) : createCommentVNode("", true)
  ], 46, _hoisted_1)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
    renderSlot(_ctx.$slots, "default"),
    renderSlot(_ctx.$slots, "content", {
      items: $props.items,
      rows: $props.items,
      columns: $options.loadedColumns
    })
  ], 64));
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
var css_248z = "\n.p-virtualscroller {\n    position: relative;\n    overflow: auto;\n    contain: strict;\n    transform: translateZ(0);\n    will-change: scroll-position;\n    outline: 0 none;\n}\n.p-virtualscroller-content {\n    position: absolute;\n    top: 0;\n    left: 0;\n    /* contain: content; */\n    min-height: 100%;\n    min-width: 100%;\n    will-change: transform;\n}\n.p-virtualscroller-spacer {\n    position: absolute;\n    top: 0;\n    left: 0;\n    height: 1px;\n    width: 1px;\n    transform-origin: 0 0;\n    pointer-events: none;\n}\n.p-virtualscroller .p-virtualscroller-loader {\n    position: sticky;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n}\n.p-virtualscroller-loader.p-component-overlay {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n.p-virtualscroller-loading-icon {\n    font-size: 2rem;\n}\n.p-virtualscroller-horizontal > .p-virtualscroller-content {\n    display: flex;\n}\n\n/* Inline */\n.p-virtualscroller-inline .p-virtualscroller-content {\n    position: static;\n}\n";
styleInject(css_248z);
script2.render = render;

// node_modules/primevue/dropdown/dropdown.esm.js
var script3 = {
  name: "Dropdown",
  emits: ["update:modelValue", "change", "focus", "blur", "before-show", "before-hide", "show", "hide", "filter"],
  props: {
    modelValue: null,
    options: Array,
    optionLabel: null,
    optionValue: null,
    optionDisabled: null,
    optionGroupLabel: null,
    optionGroupChildren: null,
    scrollHeight: {
      type: String,
      default: "200px"
    },
    filter: Boolean,
    filterPlaceholder: String,
    filterLocale: String,
    filterMatchMode: {
      type: String,
      default: "contains"
    },
    filterFields: {
      type: Array,
      default: null
    },
    editable: Boolean,
    placeholder: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    dataKey: null,
    showClear: {
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
    filterInputProps: {
      type: null,
      default: null
    },
    clearIconProps: {
      type: null,
      default: null
    },
    appendTo: {
      type: String,
      default: "body"
    },
    loading: {
      type: Boolean,
      default: false
    },
    clearIcon: {
      type: String,
      default: "pi pi-times"
    },
    dropdownIcon: {
      type: String,
      default: "pi pi-chevron-down"
    },
    filterIcon: {
      type: String,
      default: "pi pi-search"
    },
    loadingIcon: {
      type: String,
      default: "pi pi-spinner pi-spin"
    },
    resetFilterOnHide: {
      type: Boolean,
      default: false
    },
    virtualScrollerOptions: {
      type: Object,
      default: null
    },
    autoOptionFocus: {
      type: Boolean,
      default: true
    },
    autoFilterFocus: {
      type: Boolean,
      default: false
    },
    selectOnFocus: {
      type: Boolean,
      default: false
    },
    filterMessage: {
      type: String,
      default: null
    },
    selectionMessage: {
      type: String,
      default: null
    },
    emptySelectionMessage: {
      type: String,
      default: null
    },
    emptyFilterMessage: {
      type: String,
      default: null
    },
    emptyMessage: {
      type: String,
      default: null
    },
    tabindex: {
      type: Number,
      default: 0
    },
    "aria-label": {
      type: String,
      default: null
    },
    "aria-labelledby": {
      type: String,
      default: null
    }
  },
  outsideClickListener: null,
  scrollHandler: null,
  resizeListener: null,
  overlay: null,
  list: null,
  virtualScroller: null,
  searchTimeout: null,
  searchValue: null,
  isModelValueChanged: false,
  focusOnHover: false,
  data() {
    return {
      id: this.$attrs.id,
      focused: false,
      focusedOptionIndex: -1,
      filterValue: null,
      overlayVisible: false
    };
  },
  watch: {
    "$attrs.id": function(newValue) {
      this.id = newValue || UniqueComponentId();
    },
    modelValue() {
      this.isModelValueChanged = true;
    },
    options() {
      this.autoUpdateModel();
    }
  },
  mounted() {
    this.id = this.id || UniqueComponentId();
    this.autoUpdateModel();
  },
  updated() {
    if (this.overlayVisible && this.isModelValueChanged) {
      this.scrollInView(this.findSelectedOptionIndex());
    }
    this.isModelValueChanged = false;
  },
  beforeUnmount() {
    this.unbindOutsideClickListener();
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
    getOptionIndex(index, fn) {
      return this.virtualScrollerDisabled ? index : fn && fn(index)["index"];
    },
    getOptionLabel(option) {
      return this.optionLabel ? ObjectUtils.resolveFieldData(option, this.optionLabel) : option;
    },
    getOptionValue(option) {
      return this.optionValue ? ObjectUtils.resolveFieldData(option, this.optionValue) : option;
    },
    getOptionRenderKey(option, index) {
      return (this.dataKey ? ObjectUtils.resolveFieldData(option, this.dataKey) : this.getOptionLabel(option)) + "_" + index;
    },
    isOptionDisabled(option) {
      return this.optionDisabled ? ObjectUtils.resolveFieldData(option, this.optionDisabled) : false;
    },
    isOptionGroup(option) {
      return this.optionGroupLabel && option.optionGroup && option.group;
    },
    getOptionGroupLabel(optionGroup) {
      return ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel);
    },
    getOptionGroupChildren(optionGroup) {
      return ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren);
    },
    getAriaPosInset(index) {
      return (this.optionGroupLabel ? index - this.visibleOptions.slice(0, index).filter((option) => this.isOptionGroup(option)).length : index) + 1;
    },
    show(isFocus) {
      this.$emit("before-show");
      this.overlayVisible = true;
      this.focusedOptionIndex = this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
      isFocus && DomHandler.focus(this.$refs.focusInput);
    },
    hide(isFocus) {
      const _hide = () => {
        this.$emit("before-hide");
        this.overlayVisible = false;
        this.focusedOptionIndex = -1;
        this.searchValue = "";
        this.resetFilterOnHide && (this.filterValue = null);
        isFocus && DomHandler.focus(this.$refs.focusInput);
      };
      setTimeout(() => {
        _hide();
      }, 0);
    },
    onFocus(event) {
      if (this.disabled) {
        return;
      }
      this.focused = true;
      this.focusedOptionIndex = this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : this.overlayVisible && this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
      this.overlayVisible && this.scrollInView(this.focusedOptionIndex);
      this.$emit("focus", event);
    },
    onBlur(event) {
      this.focused = false;
      this.focusedOptionIndex = -1;
      this.searchValue = "";
      this.$emit("blur", event);
    },
    onKeyDown(event) {
      if (this.disabled) {
        event.preventDefault();
        return;
      }
      const metaKey = event.metaKey || event.ctrlKey;
      switch (event.code) {
        case "ArrowDown":
          this.onArrowDownKey(event);
          break;
        case "ArrowUp":
          this.onArrowUpKey(event, this.editable);
          break;
        case "ArrowLeft":
        case "ArrowRight":
          this.onArrowLeftKey(event, this.editable);
          break;
        case "Home":
          this.onHomeKey(event, this.editable);
          break;
        case "End":
          this.onEndKey(event, this.editable);
          break;
        case "PageDown":
          this.onPageDownKey(event);
          break;
        case "PageUp":
          this.onPageUpKey(event);
          break;
        case "Space":
          this.onSpaceKey(event, this.editable);
          break;
        case "Enter":
        case "NumpadEnter":
          this.onEnterKey(event);
          break;
        case "Escape":
          this.onEscapeKey(event);
          break;
        case "Tab":
          this.onTabKey(event);
          break;
        case "Backspace":
          this.onBackspaceKey(event, this.editable);
          break;
        case "ShiftLeft":
        case "ShiftRight":
          break;
        default:
          if (!metaKey && ObjectUtils.isPrintableCharacter(event.key)) {
            !this.overlayVisible && this.show();
            !this.editable && this.searchOptions(event, event.key);
          }
          break;
      }
    },
    onEditableInput(event) {
      const value = event.target.value;
      this.searchValue = "";
      const matched = this.searchOptions(event, value);
      !matched && (this.focusedOptionIndex = -1);
      this.updateModel(event, value);
    },
    onContainerClick(event) {
      if (this.disabled || this.loading) {
        return;
      }
      if (DomHandler.hasClass(event.target, "p-dropdown-clear-icon") || event.target.tagName === "INPUT") {
        return;
      } else if (!this.overlay || !this.overlay.contains(event.target)) {
        this.overlayVisible ? this.hide(true) : this.show(true);
      }
    },
    onClearClick(event) {
      this.updateModel(event, null);
    },
    onFirstHiddenFocus(event) {
      const focusableEl = event.relatedTarget === this.$refs.focusInput ? DomHandler.getFirstFocusableElement(this.overlay, ":not(.p-hidden-focusable)") : this.$refs.focusInput;
      DomHandler.focus(focusableEl);
    },
    onLastHiddenFocus(event) {
      const focusableEl = event.relatedTarget === this.$refs.focusInput ? DomHandler.getLastFocusableElement(this.overlay, ":not(.p-hidden-focusable)") : this.$refs.focusInput;
      DomHandler.focus(focusableEl);
    },
    onOptionSelect(event, option, isHide = true) {
      const value = this.getOptionValue(option);
      this.updateModel(event, value);
      isHide && this.hide(true);
    },
    onOptionMouseMove(event, index) {
      if (this.focusOnHover) {
        this.changeFocusedOptionIndex(event, index);
      }
    },
    onFilterChange(event) {
      const value = event.target.value;
      this.filterValue = value;
      this.focusedOptionIndex = -1;
      this.$emit("filter", { originalEvent: event, value });
      !this.virtualScrollerDisabled && this.virtualScroller.scrollToIndex(0);
    },
    onFilterKeyDown(event) {
      switch (event.code) {
        case "ArrowDown":
          this.onArrowDownKey(event);
          break;
        case "ArrowUp":
          this.onArrowUpKey(event, true);
          break;
        case "ArrowLeft":
        case "ArrowRight":
          this.onArrowLeftKey(event, true);
          break;
        case "Home":
          this.onHomeKey(event, true);
          break;
        case "End":
          this.onEndKey(event, true);
          break;
        case "Enter":
          this.onEnterKey(event);
          break;
        case "Escape":
          this.onEscapeKey(event);
          break;
        case "Tab":
          this.onTabKey(event, true);
          break;
      }
    },
    onFilterBlur() {
      this.focusedOptionIndex = -1;
    },
    onFilterUpdated() {
      if (this.overlayVisible) {
        this.alignOverlay();
      }
    },
    onOverlayClick(event) {
      OverlayEventBus.emit("overlay-click", {
        originalEvent: event,
        target: this.$el
      });
    },
    onOverlayKeyDown(event) {
      switch (event.code) {
        case "Escape":
          this.onEscapeKey(event);
          break;
      }
    },
    onArrowDownKey(event) {
      const optionIndex = this.focusedOptionIndex !== -1 ? this.findNextOptionIndex(this.focusedOptionIndex) : this.findFirstFocusedOptionIndex();
      this.changeFocusedOptionIndex(event, optionIndex);
      !this.overlayVisible && this.show();
      event.preventDefault();
    },
    onArrowUpKey(event, pressedInInputText = false) {
      if (event.altKey && !pressedInInputText) {
        if (this.focusedOptionIndex !== -1) {
          this.onOptionSelect(event, this.visibleOptions[this.focusedOptionIndex]);
        }
        this.overlayVisible && this.hide();
        event.preventDefault();
      } else {
        const optionIndex = this.focusedOptionIndex !== -1 ? this.findPrevOptionIndex(this.focusedOptionIndex) : this.findLastFocusedOptionIndex();
        this.changeFocusedOptionIndex(event, optionIndex);
        !this.overlayVisible && this.show();
        event.preventDefault();
      }
    },
    onArrowLeftKey(event, pressedInInputText = false) {
      pressedInInputText && (this.focusedOptionIndex = -1);
    },
    onHomeKey(event, pressedInInputText = false) {
      if (pressedInInputText) {
        event.currentTarget.setSelectionRange(0, 0);
        this.focusedOptionIndex = -1;
      } else {
        this.changeFocusedOptionIndex(event, this.findFirstOptionIndex());
        !this.overlayVisible && this.show();
      }
      event.preventDefault();
    },
    onEndKey(event, pressedInInputText = false) {
      if (pressedInInputText) {
        const target = event.currentTarget;
        const len = target.value.length;
        target.setSelectionRange(len, len);
        this.focusedOptionIndex = -1;
      } else {
        this.changeFocusedOptionIndex(event, this.findLastOptionIndex());
        !this.overlayVisible && this.show();
      }
      event.preventDefault();
    },
    onPageUpKey(event) {
      this.scrollInView(0);
      event.preventDefault();
    },
    onPageDownKey(event) {
      this.scrollInView(this.visibleOptions.length - 1);
      event.preventDefault();
    },
    onEnterKey(event) {
      if (!this.overlayVisible) {
        this.onArrowDownKey(event);
      } else {
        if (this.focusedOptionIndex !== -1) {
          this.onOptionSelect(event, this.visibleOptions[this.focusedOptionIndex]);
        }
        this.hide();
      }
      event.preventDefault();
    },
    onSpaceKey(event, pressedInInputText = false) {
      !pressedInInputText && this.onEnterKey(event);
    },
    onEscapeKey(event) {
      this.overlayVisible && this.hide(true);
      event.preventDefault();
    },
    onTabKey(event, pressedInInputText = false) {
      if (!pressedInInputText) {
        if (this.overlayVisible && this.hasFocusableElements()) {
          DomHandler.focus(this.$refs.firstHiddenFocusableElementOnOverlay);
          event.preventDefault();
        } else {
          if (this.focusedOptionIndex !== -1) {
            this.onOptionSelect(event, this.visibleOptions[this.focusedOptionIndex]);
          }
          this.overlayVisible && this.hide(this.filter);
        }
      }
    },
    onBackspaceKey(event, pressedInInputText = false) {
      if (pressedInInputText) {
        !this.overlayVisible && this.show();
      }
    },
    onOverlayEnter(el) {
      ZIndexUtils.set("overlay", el, this.$primevue.config.zIndex.overlay);
      this.alignOverlay();
      this.scrollInView();
      this.autoFilterFocus && DomHandler.focus(this.$refs.filterInput);
    },
    onOverlayAfterEnter() {
      this.bindOutsideClickListener();
      this.bindScrollListener();
      this.bindResizeListener();
      this.$emit("show");
    },
    onOverlayLeave() {
      this.unbindOutsideClickListener();
      this.unbindScrollListener();
      this.unbindResizeListener();
      this.$emit("hide");
      this.overlay = null;
    },
    onOverlayAfterLeave(el) {
      ZIndexUtils.clear(el);
    },
    alignOverlay() {
      if (this.appendTo === "self") {
        DomHandler.relativePosition(this.overlay, this.$el);
      } else {
        this.overlay.style.minWidth = DomHandler.getOuterWidth(this.$el) + "px";
        DomHandler.absolutePosition(this.overlay, this.$el);
      }
    },
    bindOutsideClickListener() {
      if (!this.outsideClickListener) {
        this.outsideClickListener = (event) => {
          if (this.overlayVisible && this.overlay && !this.$el.contains(event.target) && !this.overlay.contains(event.target)) {
            this.hide();
          }
        };
        document.addEventListener("click", this.outsideClickListener);
      }
    },
    unbindOutsideClickListener() {
      if (this.outsideClickListener) {
        document.removeEventListener("click", this.outsideClickListener);
        this.outsideClickListener = null;
      }
    },
    bindScrollListener() {
      if (!this.scrollHandler) {
        this.scrollHandler = new ConnectedOverlayScrollHandler(this.$refs.container, () => {
          if (this.overlayVisible) {
            this.hide();
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
            this.hide();
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
    hasFocusableElements() {
      return DomHandler.getFocusableElements(this.overlay, ":not(.p-hidden-focusable)").length > 0;
    },
    isOptionMatched(option) {
      return this.isValidOption(option) && this.getOptionLabel(option).toLocaleLowerCase(this.filterLocale).startsWith(this.searchValue.toLocaleLowerCase(this.filterLocale));
    },
    isValidOption(option) {
      return option && !(this.isOptionDisabled(option) || this.isOptionGroup(option));
    },
    isValidSelectedOption(option) {
      return this.isValidOption(option) && this.isSelected(option);
    },
    isSelected(option) {
      return this.isValidOption(option) && ObjectUtils.equals(this.modelValue, this.getOptionValue(option), this.equalityKey);
    },
    findFirstOptionIndex() {
      return this.visibleOptions.findIndex((option) => this.isValidOption(option));
    },
    findLastOptionIndex() {
      return ObjectUtils.findLastIndex(this.visibleOptions, (option) => this.isValidOption(option));
    },
    findNextOptionIndex(index) {
      const matchedOptionIndex = index < this.visibleOptions.length - 1 ? this.visibleOptions.slice(index + 1).findIndex((option) => this.isValidOption(option)) : -1;
      return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : index;
    },
    findPrevOptionIndex(index) {
      const matchedOptionIndex = index > 0 ? ObjectUtils.findLastIndex(this.visibleOptions.slice(0, index), (option) => this.isValidOption(option)) : -1;
      return matchedOptionIndex > -1 ? matchedOptionIndex : index;
    },
    findSelectedOptionIndex() {
      return this.hasSelectedOption ? this.visibleOptions.findIndex((option) => this.isValidSelectedOption(option)) : -1;
    },
    findFirstFocusedOptionIndex() {
      const selectedIndex = this.findSelectedOptionIndex();
      return selectedIndex < 0 ? this.findFirstOptionIndex() : selectedIndex;
    },
    findLastFocusedOptionIndex() {
      const selectedIndex = this.findSelectedOptionIndex();
      return selectedIndex < 0 ? this.findLastOptionIndex() : selectedIndex;
    },
    searchOptions(event, char) {
      this.searchValue = (this.searchValue || "") + char;
      let optionIndex = -1;
      let matched = false;
      if (this.focusedOptionIndex !== -1) {
        optionIndex = this.visibleOptions.slice(this.focusedOptionIndex).findIndex((option) => this.isOptionMatched(option));
        optionIndex = optionIndex === -1 ? this.visibleOptions.slice(0, this.focusedOptionIndex).findIndex((option) => this.isOptionMatched(option)) : optionIndex + this.focusedOptionIndex;
      } else {
        optionIndex = this.visibleOptions.findIndex((option) => this.isOptionMatched(option));
      }
      if (optionIndex !== -1) {
        matched = true;
      }
      if (optionIndex === -1 && this.focusedOptionIndex === -1) {
        optionIndex = this.findFirstFocusedOptionIndex();
      }
      if (optionIndex !== -1) {
        this.changeFocusedOptionIndex(event, optionIndex);
      }
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }
      this.searchTimeout = setTimeout(() => {
        this.searchValue = "";
        this.searchTimeout = null;
      }, 500);
      return matched;
    },
    changeFocusedOptionIndex(event, index) {
      if (this.focusedOptionIndex !== index) {
        this.focusedOptionIndex = index;
        this.scrollInView();
        if (this.selectOnFocus) {
          this.onOptionSelect(event, this.visibleOptions[index], false);
        }
      }
    },
    scrollInView(index = -1) {
      const id = index !== -1 ? `${this.id}_${index}` : this.focusedOptionId;
      const element = DomHandler.findSingle(this.list, `li[id="${id}"]`);
      if (element) {
        element.scrollIntoView && element.scrollIntoView({ block: "nearest", inline: "start" });
      } else if (!this.virtualScrollerDisabled) {
        setTimeout(() => {
          this.virtualScroller && this.virtualScroller.scrollToIndex(index !== -1 ? index : this.focusedOptionIndex);
        }, 0);
      }
    },
    autoUpdateModel() {
      if (this.selectOnFocus && this.autoOptionFocus && !this.hasSelectedOption) {
        this.focusedOptionIndex = this.findFirstFocusedOptionIndex();
        this.onOptionSelect(null, this.visibleOptions[this.focusedOptionIndex], false);
      }
    },
    updateModel(event, value) {
      this.$emit("update:modelValue", value);
      this.$emit("change", { originalEvent: event, value });
    },
    flatOptions(options) {
      return (options || []).reduce((result, option, index) => {
        result.push({ optionGroup: option, group: true, index });
        const optionGroupChildren = this.getOptionGroupChildren(option);
        optionGroupChildren && optionGroupChildren.forEach((o) => result.push(o));
        return result;
      }, []);
    },
    overlayRef(el) {
      this.overlay = el;
    },
    listRef(el, contentRef) {
      this.list = el;
      contentRef && contentRef(el);
    },
    virtualScrollerRef(el) {
      this.virtualScroller = el;
    }
  },
  computed: {
    containerClass() {
      return [
        "p-dropdown p-component p-inputwrapper",
        {
          "p-disabled": this.disabled,
          "p-dropdown-clearable": this.showClear && !this.disabled,
          "p-focus": this.focused,
          "p-inputwrapper-filled": this.modelValue,
          "p-inputwrapper-focus": this.focused || this.overlayVisible,
          "p-overlay-open": this.overlayVisible
        }
      ];
    },
    inputStyleClass() {
      return [
        "p-dropdown-label p-inputtext",
        this.inputClass,
        {
          "p-placeholder": !this.editable && this.label === this.placeholder,
          "p-dropdown-label-empty": !this.editable && !this.$slots["value"] && (this.label === "p-emptylabel" || this.label.length === 0)
        }
      ];
    },
    panelStyleClass() {
      return [
        "p-dropdown-panel p-component",
        this.panelClass,
        {
          "p-input-filled": this.$primevue.config.inputStyle === "filled",
          "p-ripple-disabled": this.$primevue.config.ripple === false
        }
      ];
    },
    dropdownIconClass() {
      return ["p-dropdown-trigger-icon", this.loading ? this.loadingIcon : this.dropdownIcon];
    },
    visibleOptions() {
      const options = this.optionGroupLabel ? this.flatOptions(this.options) : this.options || [];
      if (this.filterValue) {
        const filteredOptions = FilterService.filter(options, this.searchFields, this.filterValue, this.filterMatchMode, this.filterLocale);
        if (this.optionGroupLabel) {
          const optionGroups = this.options || [];
          const filtered = [];
          optionGroups.forEach((group) => {
            const groupChildren = this.getOptionGroupChildren(group);
            const filteredItems = groupChildren.filter((item) => filteredOptions.includes(item));
            if (filteredItems.length > 0)
              filtered.push({ ...group, [typeof this.optionGroupChildren === "string" ? this.optionGroupChildren : "items"]: [...filteredItems] });
          });
          return this.flatOptions(filtered);
        }
        return filteredOptions;
      }
      return options;
    },
    hasSelectedOption() {
      return ObjectUtils.isNotEmpty(this.modelValue);
    },
    label() {
      const selectedOptionIndex = this.findSelectedOptionIndex();
      return selectedOptionIndex !== -1 ? this.getOptionLabel(this.visibleOptions[selectedOptionIndex]) : this.placeholder || "p-emptylabel";
    },
    editableInputValue() {
      const selectedOptionIndex = this.findSelectedOptionIndex();
      return selectedOptionIndex !== -1 ? this.getOptionLabel(this.visibleOptions[selectedOptionIndex]) : this.modelValue || "";
    },
    equalityKey() {
      return this.optionValue ? null : this.dataKey;
    },
    searchFields() {
      return this.filterFields || [this.optionLabel];
    },
    filterResultMessageText() {
      return ObjectUtils.isNotEmpty(this.visibleOptions) ? this.filterMessageText.replaceAll("{0}", this.visibleOptions.length) : this.emptyFilterMessageText;
    },
    filterMessageText() {
      return this.filterMessage || this.$primevue.config.locale.searchMessage || "";
    },
    emptyFilterMessageText() {
      return this.emptyFilterMessage || this.$primevue.config.locale.emptySearchMessage || this.$primevue.config.locale.emptyFilterMessage || "";
    },
    emptyMessageText() {
      return this.emptyMessage || this.$primevue.config.locale.emptyMessage || "";
    },
    selectionMessageText() {
      return this.selectionMessage || this.$primevue.config.locale.selectionMessage || "";
    },
    emptySelectionMessageText() {
      return this.emptySelectionMessage || this.$primevue.config.locale.emptySelectionMessage || "";
    },
    selectedMessageText() {
      return this.hasSelectedOption ? this.selectionMessageText.replaceAll("{0}", "1") : this.emptySelectionMessageText;
    },
    focusedOptionId() {
      return this.focusedOptionIndex !== -1 ? `${this.id}_${this.focusedOptionIndex}` : null;
    },
    ariaSetSize() {
      return this.visibleOptions.filter((option) => !this.isOptionGroup(option)).length;
    },
    virtualScrollerDisabled() {
      return !this.virtualScrollerOptions;
    }
  },
  directives: {
    ripple: Ripple
  },
  components: {
    VirtualScroller: script2,
    Portal: script
  }
};
var _hoisted_12 = ["id"];
var _hoisted_22 = ["id", "value", "placeholder", "tabindex", "disabled", "aria-label", "aria-labelledby", "aria-expanded", "aria-controls", "aria-activedescendant"];
var _hoisted_3 = ["id", "tabindex", "aria-label", "aria-labelledby", "aria-expanded", "aria-controls", "aria-activedescendant", "aria-disabled"];
var _hoisted_4 = { class: "p-dropdown-trigger" };
var _hoisted_5 = {
  key: 0,
  class: "p-dropdown-header"
};
var _hoisted_6 = { class: "p-dropdown-filter-container" };
var _hoisted_7 = ["value", "placeholder", "aria-owns", "aria-activedescendant"];
var _hoisted_8 = {
  role: "status",
  "aria-live": "polite",
  class: "p-hidden-accessible"
};
var _hoisted_9 = ["id"];
var _hoisted_10 = ["id"];
var _hoisted_11 = ["id", "aria-label", "aria-selected", "aria-disabled", "aria-setsize", "aria-posinset", "onClick", "onMousemove"];
var _hoisted_122 = {
  key: 0,
  class: "p-dropdown-empty-message",
  role: "option"
};
var _hoisted_13 = {
  key: 1,
  class: "p-dropdown-empty-message",
  role: "option"
};
var _hoisted_14 = {
  key: 1,
  role: "status",
  "aria-live": "polite",
  class: "p-hidden-accessible"
};
var _hoisted_15 = {
  role: "status",
  "aria-live": "polite",
  class: "p-hidden-accessible"
};
function render2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_VirtualScroller = resolveComponent("VirtualScroller");
  const _component_Portal = resolveComponent("Portal");
  const _directive_ripple = resolveDirective("ripple");
  return openBlock(), createElementBlock("div", {
    ref: "container",
    id: $data.id,
    class: normalizeClass($options.containerClass),
    onClick: _cache[16] || (_cache[16] = (...args) => $options.onContainerClick && $options.onContainerClick(...args))
  }, [
    $props.editable ? (openBlock(), createElementBlock("input", mergeProps({
      key: 0,
      ref: "focusInput",
      id: $props.inputId,
      type: "text",
      style: $props.inputStyle,
      class: $options.inputStyleClass,
      value: $options.editableInputValue,
      placeholder: $props.placeholder,
      tabindex: !$props.disabled ? $props.tabindex : -1,
      disabled: $props.disabled,
      autocomplete: "off",
      role: "combobox",
      "aria-label": _ctx.ariaLabel,
      "aria-labelledby": _ctx.ariaLabelledby,
      "aria-haspopup": "listbox",
      "aria-expanded": $data.overlayVisible,
      "aria-controls": $data.id + "_list",
      "aria-activedescendant": $data.focused ? $options.focusedOptionId : void 0,
      onFocus: _cache[0] || (_cache[0] = (...args) => $options.onFocus && $options.onFocus(...args)),
      onBlur: _cache[1] || (_cache[1] = (...args) => $options.onBlur && $options.onBlur(...args)),
      onKeydown: _cache[2] || (_cache[2] = (...args) => $options.onKeyDown && $options.onKeyDown(...args)),
      onInput: _cache[3] || (_cache[3] = (...args) => $options.onEditableInput && $options.onEditableInput(...args))
    }, $props.inputProps), null, 16, _hoisted_22)) : (openBlock(), createElementBlock("span", mergeProps({
      key: 1,
      ref: "focusInput",
      id: $props.inputId,
      style: $props.inputStyle,
      class: $options.inputStyleClass,
      tabindex: !$props.disabled ? $props.tabindex : -1,
      role: "combobox",
      "aria-label": _ctx.ariaLabel || ($options.label === "p-emptylabel" ? void 0 : $options.label),
      "aria-labelledby": _ctx.ariaLabelledby,
      "aria-haspopup": "listbox",
      "aria-expanded": $data.overlayVisible,
      "aria-controls": $data.id + "_list",
      "aria-activedescendant": $data.focused ? $options.focusedOptionId : void 0,
      "aria-disabled": $props.disabled,
      onFocus: _cache[4] || (_cache[4] = (...args) => $options.onFocus && $options.onFocus(...args)),
      onBlur: _cache[5] || (_cache[5] = (...args) => $options.onBlur && $options.onBlur(...args)),
      onKeydown: _cache[6] || (_cache[6] = (...args) => $options.onKeyDown && $options.onKeyDown(...args))
    }, $props.inputProps), [
      renderSlot(_ctx.$slots, "value", {
        value: $props.modelValue,
        placeholder: $props.placeholder
      }, () => [
        createTextVNode(toDisplayString($options.label === "p-emptylabel" ? " " : $options.label || "empty"), 1)
      ])
    ], 16, _hoisted_3)),
    $props.showClear && $props.modelValue != null ? (openBlock(), createElementBlock("i", mergeProps({
      key: 2,
      class: ["p-dropdown-clear-icon", $props.clearIcon],
      onClick: _cache[7] || (_cache[7] = (...args) => $options.onClearClick && $options.onClearClick(...args))
    }, $props.clearIconProps), null, 16)) : createCommentVNode("", true),
    createBaseVNode("div", _hoisted_4, [
      renderSlot(_ctx.$slots, "indicator", {}, () => [
        createBaseVNode("span", {
          class: normalizeClass($options.dropdownIconClass),
          "aria-hidden": "true"
        }, null, 2)
      ])
    ]),
    createVNode(_component_Portal, { appendTo: $props.appendTo }, {
      default: withCtx(() => [
        createVNode(Transition, {
          name: "p-connected-overlay",
          onEnter: $options.onOverlayEnter,
          onAfterEnter: $options.onOverlayAfterEnter,
          onLeave: $options.onOverlayLeave,
          onAfterLeave: $options.onOverlayAfterLeave
        }, {
          default: withCtx(() => [
            $data.overlayVisible ? (openBlock(), createElementBlock("div", mergeProps({
              key: 0,
              ref: $options.overlayRef,
              style: $props.panelStyle,
              class: $options.panelStyleClass,
              onClick: _cache[14] || (_cache[14] = (...args) => $options.onOverlayClick && $options.onOverlayClick(...args)),
              onKeydown: _cache[15] || (_cache[15] = (...args) => $options.onOverlayKeyDown && $options.onOverlayKeyDown(...args))
            }, $props.panelProps), [
              createBaseVNode("span", {
                ref: "firstHiddenFocusableElementOnOverlay",
                role: "presentation",
                "aria-hidden": "true",
                class: "p-hidden-accessible p-hidden-focusable",
                tabindex: 0,
                onFocus: _cache[8] || (_cache[8] = (...args) => $options.onFirstHiddenFocus && $options.onFirstHiddenFocus(...args))
              }, null, 544),
              renderSlot(_ctx.$slots, "header", {
                value: $props.modelValue,
                options: $options.visibleOptions
              }),
              $props.filter ? (openBlock(), createElementBlock("div", _hoisted_5, [
                createBaseVNode("div", _hoisted_6, [
                  createBaseVNode("input", mergeProps({
                    ref: "filterInput",
                    type: "text",
                    value: $data.filterValue,
                    onVnodeUpdated: _cache[9] || (_cache[9] = (...args) => $options.onFilterUpdated && $options.onFilterUpdated(...args)),
                    class: "p-dropdown-filter p-inputtext p-component",
                    placeholder: $props.filterPlaceholder,
                    role: "searchbox",
                    autocomplete: "off",
                    "aria-owns": $data.id + "_list",
                    "aria-activedescendant": $options.focusedOptionId,
                    onKeydown: _cache[10] || (_cache[10] = (...args) => $options.onFilterKeyDown && $options.onFilterKeyDown(...args)),
                    onBlur: _cache[11] || (_cache[11] = (...args) => $options.onFilterBlur && $options.onFilterBlur(...args)),
                    onInput: _cache[12] || (_cache[12] = (...args) => $options.onFilterChange && $options.onFilterChange(...args))
                  }, $props.filterInputProps), null, 16, _hoisted_7),
                  createBaseVNode("span", {
                    class: normalizeClass(["p-dropdown-filter-icon", $props.filterIcon])
                  }, null, 2)
                ]),
                createBaseVNode("span", _hoisted_8, toDisplayString($options.filterResultMessageText), 1)
              ])) : createCommentVNode("", true),
              createBaseVNode("div", {
                class: "p-dropdown-items-wrapper",
                style: normalizeStyle({ "max-height": $options.virtualScrollerDisabled ? $props.scrollHeight : "" })
              }, [
                createVNode(_component_VirtualScroller, mergeProps({ ref: $options.virtualScrollerRef }, $props.virtualScrollerOptions, {
                  items: $options.visibleOptions,
                  style: { height: $props.scrollHeight },
                  tabindex: -1,
                  disabled: $options.virtualScrollerDisabled
                }), createSlots({
                  content: withCtx(({ styleClass, contentRef, items, getItemOptions, contentStyle, itemSize }) => [
                    createBaseVNode("ul", {
                      ref: (el) => $options.listRef(el, contentRef),
                      id: $data.id + "_list",
                      class: normalizeClass(["p-dropdown-items", styleClass]),
                      style: normalizeStyle(contentStyle),
                      role: "listbox"
                    }, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(items, (option, i) => {
                        return openBlock(), createElementBlock(Fragment, {
                          key: $options.getOptionRenderKey(option, $options.getOptionIndex(i, getItemOptions))
                        }, [
                          $options.isOptionGroup(option) ? (openBlock(), createElementBlock("li", {
                            key: 0,
                            id: $data.id + "_" + $options.getOptionIndex(i, getItemOptions),
                            style: normalizeStyle({ height: itemSize ? itemSize + "px" : void 0 }),
                            class: "p-dropdown-item-group",
                            role: "option"
                          }, [
                            renderSlot(_ctx.$slots, "optiongroup", {
                              option: option.optionGroup,
                              index: $options.getOptionIndex(i, getItemOptions)
                            }, () => [
                              createTextVNode(toDisplayString($options.getOptionGroupLabel(option.optionGroup)), 1)
                            ])
                          ], 12, _hoisted_10)) : withDirectives((openBlock(), createElementBlock("li", {
                            key: 1,
                            id: $data.id + "_" + $options.getOptionIndex(i, getItemOptions),
                            style: normalizeStyle({ height: itemSize ? itemSize + "px" : void 0 }),
                            class: normalizeClass(["p-dropdown-item", { "p-highlight": $options.isSelected(option), "p-focus": $data.focusedOptionIndex === $options.getOptionIndex(i, getItemOptions), "p-disabled": $options.isOptionDisabled(option) }]),
                            role: "option",
                            "aria-label": $options.getOptionLabel(option),
                            "aria-selected": $options.isSelected(option),
                            "aria-disabled": $options.isOptionDisabled(option),
                            "aria-setsize": $options.ariaSetSize,
                            "aria-posinset": $options.getAriaPosInset($options.getOptionIndex(i, getItemOptions)),
                            onClick: ($event) => $options.onOptionSelect($event, option),
                            onMousemove: ($event) => $options.onOptionMouseMove($event, $options.getOptionIndex(i, getItemOptions))
                          }, [
                            renderSlot(_ctx.$slots, "option", {
                              option,
                              index: $options.getOptionIndex(i, getItemOptions)
                            }, () => [
                              createTextVNode(toDisplayString($options.getOptionLabel(option)), 1)
                            ])
                          ], 46, _hoisted_11)), [
                            [_directive_ripple]
                          ])
                        ], 64);
                      }), 128)),
                      $data.filterValue && (!items || items && items.length === 0) ? (openBlock(), createElementBlock("li", _hoisted_122, [
                        renderSlot(_ctx.$slots, "emptyfilter", {}, () => [
                          createTextVNode(toDisplayString($options.emptyFilterMessageText), 1)
                        ])
                      ])) : !$props.options || $props.options && $props.options.length === 0 ? (openBlock(), createElementBlock("li", _hoisted_13, [
                        renderSlot(_ctx.$slots, "empty", {}, () => [
                          createTextVNode(toDisplayString($options.emptyMessageText), 1)
                        ])
                      ])) : createCommentVNode("", true)
                    ], 14, _hoisted_9)
                  ]),
                  _: 2
                }, [
                  _ctx.$slots.loader ? {
                    name: "loader",
                    fn: withCtx(({ options }) => [
                      renderSlot(_ctx.$slots, "loader", { options })
                    ]),
                    key: "0"
                  } : void 0
                ]), 1040, ["items", "style", "disabled"])
              ], 4),
              renderSlot(_ctx.$slots, "footer", {
                value: $props.modelValue,
                options: $options.visibleOptions
              }),
              !$props.options || $props.options && $props.options.length === 0 ? (openBlock(), createElementBlock("span", _hoisted_14, toDisplayString($options.emptyMessageText), 1)) : createCommentVNode("", true),
              createBaseVNode("span", _hoisted_15, toDisplayString($options.selectedMessageText), 1),
              createBaseVNode("span", {
                ref: "lastHiddenFocusableElementOnOverlay",
                role: "presentation",
                "aria-hidden": "true",
                class: "p-hidden-accessible p-hidden-focusable",
                tabindex: 0,
                onFocus: _cache[13] || (_cache[13] = (...args) => $options.onLastHiddenFocus && $options.onLastHiddenFocus(...args))
              }, null, 544)
            ], 16)) : createCommentVNode("", true)
          ]),
          _: 3
        }, 8, ["onEnter", "onAfterEnter", "onLeave", "onAfterLeave"])
      ]),
      _: 3
    }, 8, ["appendTo"])
  ], 10, _hoisted_12);
}
function styleInject2(css, ref) {
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
var css_248z2 = "\n.p-dropdown {\n    display: inline-flex;\n    cursor: pointer;\n    position: relative;\n    user-select: none;\n}\n.p-dropdown-clear-icon {\n    position: absolute;\n    top: 50%;\n    margin-top: -0.5rem;\n}\n.p-dropdown-trigger {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n}\n.p-dropdown-label {\n    display: block;\n    white-space: nowrap;\n    overflow: hidden;\n    flex: 1 1 auto;\n    width: 1%;\n    text-overflow: ellipsis;\n    cursor: pointer;\n}\n.p-dropdown-label-empty {\n    overflow: hidden;\n    opacity: 0;\n}\ninput.p-dropdown-label {\n    cursor: default;\n}\n.p-dropdown .p-dropdown-panel {\n    min-width: 100%;\n}\n.p-dropdown-panel {\n    position: absolute;\n    top: 0;\n    left: 0;\n}\n.p-dropdown-items-wrapper {\n    overflow: auto;\n}\n.p-dropdown-item {\n    cursor: pointer;\n    font-weight: normal;\n    white-space: nowrap;\n    position: relative;\n    overflow: hidden;\n}\n.p-dropdown-item-group {\n    cursor: auto;\n}\n.p-dropdown-items {\n    margin: 0;\n    padding: 0;\n    list-style-type: none;\n}\n.p-dropdown-filter {\n    width: 100%;\n}\n.p-dropdown-filter-container {\n    position: relative;\n}\n.p-dropdown-filter-icon {\n    position: absolute;\n    top: 50%;\n    margin-top: -0.5rem;\n}\n.p-fluid .p-dropdown {\n    display: flex;\n}\n.p-fluid .p-dropdown .p-dropdown-label {\n    width: 1%;\n}\n";
styleInject2(css_248z2);
script3.render = render2;
export {
  script3 as default
};
//# sourceMappingURL=primevue_dropdown.js.map
