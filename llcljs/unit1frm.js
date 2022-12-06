 
 
 rtl.module("TopTypes",["System","Classes","SysUtils"],function () {
  "use strict";
  var $mod = this;
  this.TStaticBorderStyle = {"0": "sbsNone", sbsNone: 0, "1": "sbsSingle", sbsSingle: 1, "2": "sbsSunken", sbsSunken: 2};
  this.$rtti.$Enum("TStaticBorderStyle",{minvalue: 0, maxvalue: 2, ordtype: 1, enumtype: this.TStaticBorderStyle});
  this.TTickStyle = {"0": "tsAuto", tsAuto: 0, "1": "tsManual", tsManual: 1, "2": "tsNone", tsNone: 2};
  this.MenuItemHeight = 30;
});
rtl.module("Graphics",["System","Classes","SysUtils","Types","Web"],function () {
  "use strict";
  var $mod = this;
  this.$rtti.$Int("TFontCharSet",{minvalue: 0, maxvalue: 255, ordtype: 3});
  this.TFontStyle = {"0": "fsBold", fsBold: 0, "1": "fsItalic", fsItalic: 1, "2": "fsUnderline", fsUnderline: 2, "3": "fsStrikeOut", fsStrikeOut: 3};
  this.$rtti.$Enum("TFontStyle",{minvalue: 0, maxvalue: 3, ordtype: 1, enumtype: this.TFontStyle});
  this.$rtti.$Set("TFontStyles",{comptype: this.$rtti["TFontStyle"]});
  this.TTextLayout = {"0": "tlTop", tlTop: 0, "1": "tlCenter", tlCenter: 1, "2": "tlBottom", tlBottom: 2, "3": "tlTitle", tlTitle: 3};
  this.$rtti.$Enum("TTextLayout",{minvalue: 0, maxvalue: 3, ordtype: 1, enumtype: this.TTextLayout});
  this.TPenStyle = {"0": "psSolid", psSolid: 0, "1": "psDash", psDash: 1, "2": "psDot", psDot: 2, "3": "psDashDot", psDashDot: 3, "4": "psDashDotDot", psDashDotDot: 4, "5": "psInsideFrame", psInsideFrame: 5, "6": "psPattern", psPattern: 6, "7": "psClear", psClear: 7};
  this.$rtti.$Enum("TPenStyle",{minvalue: 0, maxvalue: 7, ordtype: 1, enumtype: this.TPenStyle});
  this.TBrushStyle = {"0": "bsSolid", bsSolid: 0, "1": "bsClear", bsClear: 1, "2": "bsHorizontal", bsHorizontal: 2, "3": "bsVertical", bsVertical: 3, "4": "bsFDiagonal", bsFDiagonal: 4, "5": "bsBDiagonal", bsBDiagonal: 5, "6": "bsCross", bsCross: 6, "7": "bsDiagCross", bsDiagCross: 7, "8": "bsImage", bsImage: 8, "9": "bsPattern", bsPattern: 9};
  this.$rtti.$Enum("TBrushStyle",{minvalue: 0, maxvalue: 9, ordtype: 1, enumtype: this.TBrushStyle});
  rtl.createClass(this,"TFont",pas.Classes.TPersistent,function () {
    this.$init = function () {
      pas.Classes.TPersistent.$init.call(this);
      this.FCharSet = 0;
      this.FColor = 0;
      this.FName = "";
      this.FSize = 0;
      this.FStyle = {};
      this.FUpdateCount = 0;
      this.FOnChange = null;
    };
    this.$final = function () {
      this.FStyle = undefined;
      this.FOnChange = undefined;
      pas.Classes.TPersistent.$final.call(this);
    };
    this.GetHeight = function () {
      var Result = 0;
      Result = Math.round((-this.FSize * 72) / 96);
      return Result;
    };
    this.SetCharSet = function (AValue) {
      if (this.FCharSet !== AValue) {
        this.FCharSet = AValue;
        this.Changed();
      };
    };
    this.SetColor = function (AValue) {
      if (this.FColor !== AValue) {
        this.FColor = AValue;
        this.Changed();
      };
    };
    this.SetHeight = function (AValue) {
      this.SetSize(Math.round((-AValue * 96) / 72));
    };
    this.SetName = function (AValue) {
      if (this.FName !== AValue) {
        this.FName = AValue;
        this.Changed();
      };
    };
    this.SetSize = function (AValue) {
      if (this.FSize !== AValue) {
        this.FSize = AValue;
        this.Changed();
      };
    };
    this.SetStyle = function (AValue) {
      if (rtl.neSet(this.FStyle,AValue)) {
        this.FStyle = rtl.refSet(AValue);
        this.Changed();
      };
    };
    this.Changed = function () {
      if ((this.FUpdateCount === 0) && (this.FOnChange != null)) {
        this.FOnChange(this);
      };
    };
    this.Create$1 = function () {
      pas.System.TObject.Create.call(this);
      this.FColor = 0;
      this.FName = $mod.ffSans;
      this.FSize = 10;
      this.FStyle = {};
      this.FUpdateCount = 0;
      return this;
    };
    this.Assign = function (Source) {
      var VFont = null;
      if ((Source != null) && $mod.TFont.isPrototypeOf(Source)) {
        this.BeginUpdate();
        try {
          VFont = Source;
          this.FCharSet = VFont.FCharSet;
          this.FColor = VFont.FColor;
          this.FName = VFont.FName;
          this.FSize = VFont.FSize;
          this.FStyle = rtl.refSet(VFont.FStyle);
        } finally {
          this.EndUpdate();
        };
      } else {
        pas.Classes.TPersistent.Assign.call(this,Source);
      };
    };
    this.BeginUpdate = function () {
      this.FUpdateCount += 1;
    };
    this.EndUpdate = function () {
      if (this.FUpdateCount > 0) {
        this.FUpdateCount -= 1;
        if (this.FUpdateCount === 0) {
          this.Changed();
        };
      };
    };
    this.IsEqual = function (AFont) {
      var Result = false;
      if (AFont != null) {
        if ((this.FCharSet !== AFont.FCharSet) || (this.FColor !== AFont.FColor) || (this.FName !== AFont.FName) || (this.FSize !== AFont.FSize) || rtl.neSet(this.FStyle,AFont.FStyle)) {
          Result = false;
        } else {
          Result = true;
        };
      } else {
        Result = false;
      };
      return Result;
    };
    this.TextExtent = function (AText) {
      var Result = pas.Types.TSize.$new();
      Result.$assign($mod.JSMeasureText(AText,this.FName,this.FSize,0));
      return Result;
    };
    var $r = this.$rtti;
    $r.addProperty("CharSet",2,$mod.$rtti["TFontCharSet"],"FCharSet","SetCharSet");
    $r.addProperty("Color",2,rtl.longint,"FColor","SetColor");
    $r.addProperty("Height",3,rtl.nativeint,"GetHeight","SetHeight");
    $r.addProperty("Name",2,rtl.string,"FName","SetName");
    $r.addProperty("Size",2,rtl.nativeint,"FSize","SetSize");
    $r.addProperty("Style",2,$mod.$rtti["TFontStyles"],"FStyle","SetStyle");
    $r.addProperty("OnChange",0,pas.Classes.$rtti["TNotifyEvent"],"FOnChange","FOnChange");
  });
  rtl.createClass(this,"TPen",pas.Classes.TPersistent,function () {
    this.$init = function () {
      pas.Classes.TPersistent.$init.call(this);
      this.FColor = 0;
      this.FStyle = 0;
      this.FWidth = 0;
      this.FUpdateCount = 0;
      this.FOnChange = null;
    };
    this.$final = function () {
      this.FOnChange = undefined;
      pas.Classes.TPersistent.$final.call(this);
    };
    this.SetColor = function (AValue) {
      if (this.FColor !== AValue) {
        this.FColor = AValue;
        this.Changed();
      };
    };
    this.SetStyle = function (AValue) {
      if (this.FStyle !== AValue) {
        this.FStyle = AValue;
        this.Changed();
      };
    };
    this.SetWidth = function (AValue) {
      if (this.FWidth !== AValue) {
        this.FWidth = AValue;
        this.Changed();
      };
    };
    this.Changed = function () {
      if ((this.FUpdateCount === 0) && (this.FOnChange != null)) {
        this.FOnChange(this);
      };
    };
    this.Create$1 = function () {
      pas.System.TObject.Create.call(this);
      this.FColor = 0;
      this.FStyle = $mod.TPenStyle.psSolid;
      this.FWidth = 1;
      this.FUpdateCount = 0;
      return this;
    };
    this.Assign = function (Source) {
      var VPen = null;
      if ((Source != null) && $mod.TPen.isPrototypeOf(Source)) {
        this.BeginUpdate();
        try {
          VPen = Source;
          this.FColor = VPen.FColor;
          this.FStyle = VPen.FStyle;
          this.FWidth = VPen.FWidth;
        } finally {
          this.EndUpdate();
        };
      } else {
        pas.Classes.TPersistent.Assign.call(this,Source);
      };
    };
    this.BeginUpdate = function () {
      this.FUpdateCount += 1;
    };
    this.EndUpdate = function () {
      if (this.FUpdateCount > 0) {
        this.FUpdateCount -= 1;
        if (this.FUpdateCount === 0) {
          this.Changed();
        };
      };
    };
    var $r = this.$rtti;
    $r.addProperty("Color",2,rtl.longint,"FColor","SetColor");
    $r.addProperty("Style",2,$mod.$rtti["TPenStyle"],"FStyle","SetStyle");
    $r.addProperty("Width",2,rtl.nativeint,"FWidth","SetWidth");
    $r.addProperty("OnChange",0,pas.Classes.$rtti["TNotifyEvent"],"FOnChange","FOnChange");
  });
  rtl.createClass(this,"TBrush",pas.Classes.TPersistent,function () {
    this.$init = function () {
      pas.Classes.TPersistent.$init.call(this);
      this.FColor = 0;
      this.FStyle = 0;
      this.FUpdateCount = 0;
      this.FOnChange = null;
    };
    this.$final = function () {
      this.FOnChange = undefined;
      pas.Classes.TPersistent.$final.call(this);
    };
    this.SetColor = function (AValue) {
      if (this.FColor !== AValue) {
        this.FColor = AValue;
        this.Changed();
      };
    };
    this.SetStyle = function (AValue) {
      if (this.FStyle === AValue) {
        this.FStyle = AValue;
        this.Changed();
      };
    };
    this.Changed = function () {
      if ((this.FUpdateCount === 0) && (this.FOnChange != null)) {
        this.FOnChange(this);
      };
    };
    this.Create$1 = function () {
      pas.System.TObject.Create.call(this);
      this.FColor = 16777215;
      this.FStyle = $mod.TBrushStyle.bsSolid;
      this.FUpdateCount = 0;
      return this;
    };
    this.Assign = function (Source) {
      var VBrush = null;
      if ((Source != null) && $mod.TBrush.isPrototypeOf(Source)) {
        this.BeginUpdate();
        try {
          VBrush = Source;
          this.FColor = VBrush.FColor;
          this.FStyle = VBrush.FStyle;
        } finally {
          this.EndUpdate();
        };
      } else {
        pas.Classes.TPersistent.Assign.call(this,Source);
      };
    };
    this.BeginUpdate = function () {
      this.FUpdateCount += 1;
    };
    this.EndUpdate = function () {
      if (this.FUpdateCount > 0) {
        this.FUpdateCount -= 1;
        if (this.FUpdateCount === 0) {
          this.Changed();
        };
      };
    };
    var $r = this.$rtti;
    $r.addProperty("Color",2,rtl.longint,"FColor","SetColor");
    $r.addProperty("Style",2,$mod.$rtti["TBrushStyle"],"FStyle","SetStyle");
    $r.addProperty("OnChange",0,pas.Classes.$rtti["TNotifyEvent"],"FOnChange","FOnChange");
  });
  rtl.createClass(this,"TCanvas",pas.Classes.TPersistent,function () {
    this.$init = function () {
      pas.Classes.TPersistent.$init.call(this);
      this.FBrush = null;
      this.FFont = null;
      this.FPen = null;
      this.FUpdateCount = 0;
      this.FOnChange = null;
      this.FCanvasElement = null;
      this.FContextElement = null;
    };
    this.$final = function () {
      this.FBrush = undefined;
      this.FFont = undefined;
      this.FPen = undefined;
      this.FOnChange = undefined;
      this.FCanvasElement = undefined;
      this.FContextElement = undefined;
      pas.Classes.TPersistent.$final.call(this);
    };
    this.PrepareStyle = function () {
      this.FContextElement.fillStyle = $mod.JSColor(this.FBrush.FColor);
      this.FContextElement.lineWidth = this.FPen.FWidth;
      this.FContextElement.strokeStyle = $mod.JSColor(this.FPen.FColor);
      var $tmp = this.FPen.FStyle;
      if ($tmp === $mod.TPenStyle.psDash) {
        this.FContextElement.setLineDash([8,2])}
       else if ($tmp === $mod.TPenStyle.psDot) {
        this.FContextElement.setLineDash([1,2])}
       else {
        this.FContextElement.setLineDash([]);
      };
    };
    this.Create$1 = function () {
      pas.System.TObject.Create.call(this);
      this.FCanvasElement = document.createElement("canvas");
      this.FContextElement = this.FCanvasElement.getContext("2d");
      this.FBrush = $mod.TBrush.$create("Create$1");
      this.FFont = $mod.TFont.$create("Create$1");
      this.FPen = $mod.TPen.$create("Create$1");
      this.FUpdateCount = 0;
      return this;
    };
    this.Destroy = function () {
      this.FBrush.$destroy("Destroy");
      this.FFont.$destroy("Destroy");
      this.FPen.$destroy("Destroy");
      this.FBrush = null;
      this.FFont = null;
      this.FPen = null;
      pas.System.TObject.Destroy.call(this);
    };
    this.Clear = function () {
      this.FContextElement.clearRect(0,0,this.FCanvasElement.width,this.FCanvasElement.height);
    };
    this.FillRect$1 = function (ALeft, ATop, AWidth, AHeight) {
      this.PrepareStyle();
      if (this.FBrush.FStyle !== $mod.TBrushStyle.bsClear) {
        this.FContextElement.fillRect(ALeft,ATop,AWidth,AHeight);
      };
    };
    this.LineTo = function (X, Y) {
      this.PrepareStyle();
      this.FContextElement.lineTo(X,Y);
      if (this.FPen.FStyle !== $mod.TPenStyle.psClear) {
        this.FContextElement.stroke();
      };
    };
    this.MoveTo = function (X, Y) {
      this.FContextElement.beginPath();
      this.FContextElement.moveTo(X,Y);
    };
    this.Rectangle$1 = function (ALeft, ATop, AWidth, AHeight) {
      this.FContextElement.beginPath();
      this.PrepareStyle();
      this.FContextElement.rect(ALeft,ATop,AWidth,AHeight);
      if (this.FBrush.FStyle !== $mod.TBrushStyle.bsClear) {
        this.FContextElement.fill();
      };
      if (this.FPen.FStyle !== $mod.TPenStyle.psClear) {
        this.FContextElement.stroke();
      };
    };
    var $r = this.$rtti;
    $r.addProperty("Brush",0,$mod.$rtti["TBrush"],"FBrush","FBrush");
    $r.addProperty("Font",0,$mod.$rtti["TFont"],"FFont","FFont");
    $r.addProperty("Pen",0,$mod.$rtti["TPen"],"FPen","FPen");
    $r.addProperty("OnChange",0,pas.Classes.$rtti["TNotifyEvent"],"FOnChange","FOnChange");
  });
  this.clBlack = 0x0;
  this.clGreen = 0x8000;
  this.clGray = 0x808080;
  this.clSilver = 0xC0C0C0;
  this.clBlue = 0xFF0000;
  this.clWhite = 0xFFFFFF;
  this.clNone = 0x1FFFFFFF;
  this.clDefault = 0x20000000;
  this.clBase = 0x80000000;
  this.clScrollBar = -2147483648 + 0;
  this.clBackground = -2147483648 + 1;
  this.clActiveCaption = -2147483648 + 2;
  this.clInactiveCaption = -2147483648 + 3;
  this.clMenu = -2147483648 + 4;
  this.clWindow = -2147483648 + 5;
  this.clWindowFrame = -2147483648 + 6;
  this.clMenuText = -2147483648 + 7;
  this.clWindowText = -2147483648 + 8;
  this.clCaptionText = -2147483648 + 9;
  this.clActiveBorder = -2147483648 + 10;
  this.clInactiveBorder = -2147483648 + 11;
  this.clAppWorkspace = -2147483648 + 12;
  this.clHighlight = -2147483648 + 13;
  this.clHighlightText = -2147483648 + 14;
  this.clBtnFace = -2147483648 + 15;
  this.clBtnShadow = -2147483648 + 16;
  this.clGrayText = -2147483648 + 17;
  this.clBtnText = -2147483648 + 18;
  this.clInactiveCaptionText = -2147483648 + 19;
  this.clBtnHighlight = -2147483648 + 20;
  this.cl3DDkShadow = -2147483648 + 21;
  this.cl3DLight = -2147483648 + 22;
  this.clInfoText = -2147483648 + 23;
  this.clInfoBk = -2147483648 + 24;
  this.ffSans = '"Arial Narrow", Arial, "Helvetica Condensed", Helvetica, sans-serif';
  this.JSColor = function (AColor) {
    var Result = "";
    var R = 0;
    var G = 0;
    var B = 0;
    var $tmp = AColor;
    if ($tmp === -2147483648) {
      Result = "Scrollbar"}
     else if ($tmp === -2147483647) {
      Result = "Background"}
     else if ($tmp === -2147483646) {
      Result = "ActiveCaption"}
     else if ($tmp === -2147483645) {
      Result = "InactiveCaption"}
     else if ($tmp === -2147483644) {
      Result = "Menu"}
     else if ($tmp === -2147483643) {
      Result = "Window"}
     else if ($tmp === -2147483642) {
      Result = "WindowFrame"}
     else if ($tmp === -2147483641) {
      Result = "MenuText"}
     else if ($tmp === -2147483640) {
      Result = "WindowText"}
     else if ($tmp === -2147483639) {
      Result = "CaptionText"}
     else if ($tmp === -2147483638) {
      Result = "ActiveBorder"}
     else if ($tmp === -2147483637) {
      Result = "InactiveBorder"}
     else if ($tmp === -2147483636) {
      Result = "AppWorkspace"}
     else if ($tmp === -2147483635) {
      Result = "Highlight"}
     else if ($tmp === -2147483634) {
      Result = "HighlightText"}
     else if ($tmp === -2147483633) {
      Result = "ButtonFace"}
     else if ($tmp === -2147483632) {
      Result = "ButtonShadow"}
     else if ($tmp === -2147483631) {
      Result = "GrayText"}
     else if ($tmp === -2147483630) {
      Result = "ButtonText"}
     else if ($tmp === -2147483629) {
      Result = "InactiveCaptionText"}
     else if ($tmp === -2147483628) {
      Result = "ButtonHighlight"}
     else if ($tmp === -2147483627) {
      Result = "ThreeDDarkShadow"}
     else if ($tmp === -2147483626) {
      Result = "ThreeDHighlight"}
     else if ($tmp === -2147483625) {
      Result = "InfoText"}
     else if ($tmp === -2147483624) {
      Result = "InfoBackground"}
     else {
      R = AColor & 0xFF;
      G = (AColor >>> 8) & 0xFF;
      B = (AColor >>> 16) & 0xFF;
      Result = "#" + pas.SysUtils.IntToHex(R,2) + pas.SysUtils.IntToHex(G,2) + pas.SysUtils.IntToHex(B,2);
    };
    return Result;
  };
  this.JSMeasureText = function (AText, AFontName, AFontSize, AFixedWidth) {
    var Result = pas.Types.TSize.$new();
    var VDiv = null;
    Result.$assign(pas.Types.Size(0,0));
    if (AText !== "") {
      VDiv = document.createElement("div");
      VDiv.style.setProperty("font-family",AFontName);
      VDiv.style.setProperty("font-size",pas.SysUtils.IntToStr(AFontSize) + "px");
      VDiv.style.setProperty("overflow","scroll");
      if (AFixedWidth === 0) {
        VDiv.style.setProperty("display","inline-block");
        VDiv.style.setProperty("white-space","nowrap");
      } else {
        VDiv.style.setProperty("max-width",pas.SysUtils.IntToStr(AFixedWidth) + "px");
        VDiv.style.setProperty("width",pas.SysUtils.IntToStr(AFixedWidth) + "px");
      };
      VDiv.innerHTML = AText;
      document.body.appendChild(VDiv);
      Result.$assign(pas.Types.Size(VDiv.scrollWidth,VDiv.scrollHeight));
      document.body.removeChild(VDiv);
    };
    return Result;
  };
  $mod.$init = function () {
  };
});
rtl.module("LCLStrConsts",["System"],function () {
  "use strict";
  var $mod = this;
  $mod.$resourcestrings = {rsErrUncaughtException: {org: "Uncaught exception of type %s: \n\n%s"}, rsErrUncaughtObject: {org: "Uncaught exception of type %s."}, rsNoTimers: {org: "No more timers available."}};
});
rtl.module("p2jsres",["System","Types"],function () {
  "use strict";
  var $mod = this;
  var $impl = $mod.$impl;
  this.TResourceSource = {"0": "rsJS", rsJS: 0, "1": "rsHTML", rsHTML: 1};
  this.SetResourceSource = function (aSource) {
    var Result = 0;
    Result = $impl.gMode;
    $impl.gMode = aSource;
    return Result;
  };
  $mod.$implcode = function () {
    $impl.gMode = 0;
  };
},["SysUtils","JS","Web"]);
rtl.module("Forms",["System","Classes","SysUtils","Types","JS","Web","Graphics","Controls"],function () {
  "use strict";
  var $mod = this;
  var $impl = $mod.$impl;
  this.TFormType = {"0": "ftModalForm", ftModalForm: 0, "1": "ftWindow", ftWindow: 1, "2": "ftTop", ftTop: 2};
  this.TCloseAction = {"0": "caNone", caNone: 0, "1": "caHide", caHide: 1, "2": "caFree", caFree: 2};
  this.$rtti.$Enum("TCloseAction",{minvalue: 0, maxvalue: 2, ordtype: 1, enumtype: this.TCloseAction});
  this.$rtti.$MethodVar("TCloseEvent",{procsig: rtl.newTIProcSig([["Sender",pas.System.$rtti["TObject"]],["CloseAction",this.$rtti["TCloseAction"],1]]), methodkind: 0});
  this.$rtti.$MethodVar("TCloseQueryEvent",{procsig: rtl.newTIProcSig([["Sender",pas.System.$rtti["TObject"]],["CanClose",rtl.boolean,1]]), methodkind: 0});
  this.$rtti.$Int("TModalResult",{minvalue: -2147483648, maxvalue: 2147483647, ordtype: 4});
  rtl.createClass(this,"TCustomForm",pas.Controls.TCustomControl,function () {
    this.$init = function () {
      pas.Controls.TCustomControl.$init.call(this);
      this.FActiveControl = null;
      this.FAlphaBlend = false;
      this.FAlphaBlendValue = 0;
      this.FChildForm = null;
      this.FDesignTimePPI = 0;
      this.FFormType = 0;
      this.FKeyPreview = false;
      this.FModalResult = 0;
      this.FModalResultProc = null;
      this.FOverlay = null;
      this.FOnActivate = null;
      this.FOnClose = null;
      this.FOnCloseQuery = null;
      this.FOnCreate = null;
      this.FOnDeactivate = null;
      this.FOnDestroy = null;
      this.FOnHide = null;
      this.FOnResize$1 = null;
      this.FOnScroll$1 = null;
      this.FOnShow = null;
    };
    this.$final = function () {
      this.FActiveControl = undefined;
      this.FChildForm = undefined;
      this.FModalResultProc = undefined;
      this.FOverlay = undefined;
      this.FOnActivate = undefined;
      this.FOnClose = undefined;
      this.FOnCloseQuery = undefined;
      this.FOnCreate = undefined;
      this.FOnDeactivate = undefined;
      this.FOnDestroy = undefined;
      this.FOnHide = undefined;
      this.FOnResize$1 = undefined;
      this.FOnScroll$1 = undefined;
      this.FOnShow = undefined;
      pas.Controls.TCustomControl.$final.call(this);
    };
    this.SetActiveControl = function (AValue) {
      if (this.FActiveControl !== AValue) {
        this.FActiveControl = AValue;
      };
    };
    this.SetAlphaBlend = function (AValue) {
      if (this.FAlphaBlend !== AValue) {
        this.FAlphaBlend = AValue;
        this.Changed();
      };
    };
    this.SetAlphaBlendValue = function (AValue) {
      if (this.FAlphaBlendValue !== AValue) {
        this.FAlphaBlendValue = AValue;
        this.Changed();
      };
    };
    this.SetModalResult = function (AValue) {
      if (this.FModalResult !== AValue) {
        this.FModalResult = AValue;
        if ((this.FModalResult !== 0) && (this.FModalResultProc != null)) {
          this.Close();
        };
      };
    };
    this.Activate = function () {
      if (this.FOnActivate != null) {
        this.FOnActivate(this);
      };
    };
    this.Deactivate = function () {
      if (this.FOnDeactivate != null) {
        this.FOnDeactivate(this);
      };
    };
    this.DoClose = function (CloseAction) {
      if (this.FOnDeactivate != null) {
        this.FOnDeactivate(this);
      };
    };
    this.DoCreate = function () {
      if (this.FOnCreate != null) {
        this.FOnCreate(this);
      };
    };
    this.DoDestroy = function () {
      if (this.FOnDestroy != null) {
        this.FOnDestroy(this);
      };
    };
    this.DoHide = function () {
      if (this.FOnHide != null) {
        this.FOnHide(this);
      };
    };
    this.DoResize = function () {
      pas.Controls.TControl.DoResize.call(this);
      if (this.FOnResize$1 != null) {
        this.FOnResize$1(this);
      };
    };
    this.DoShow = function () {
      if (this.FOnShow != null) {
        this.FOnShow(this);
      };
    };
    this.HandleEnter = function (AEvent) {
      var Result = false;
      var VControl = null;
      Result = pas.Controls.TWinControl.HandleEnter.call(this,AEvent);
      if ((this.FChildForm != null) && (this.FChildForm.FFormType === $mod.TFormType.ftModalForm)) {
        this.FChildForm.Show();
      } else {
        if (this.FActiveControl != null) {
          VControl = this.FActiveControl;
        } else {
          VControl = this.FindFocusControl(null,pas.Controls.TFocusSearchDirection.fsdFirst);
        };
        this.FocusControl(VControl);
        this.Activate();
      };
      return Result;
    };
    this.HandleExit = function (AEvent) {
      var Result = false;
      Result = pas.Controls.TWinControl.HandleExit.call(this,AEvent);
      this.Deactivate();
      return Result;
    };
    this.Changed = function () {
      pas.Controls.TControl.Changed.call(this);
      if (!this.IsUpdating() && !(pas.Classes.TComponentStateItem.csLoading in this.FComponentState)) {
        var $with = this.FHandleElement;
        $with.style.setProperty("outline","none");
        if (this.FAlphaBlend) {
          $with.style.setProperty("opacity",pas.SysUtils.FloatToStr(rtl.trunc(this.FAlphaBlendValue / 255)));
        } else {
          $with.style.removeProperty("opacity");
        };
        $with.style.setProperty("overflow","auto");
      };
    };
    this.CreateHandleElement = function () {
      var Result = null;
      Result = document.createElement("div");
      return Result;
    };
    this.GetControlClassDefaultSize = function () {
      var Result = pas.Types.TSize.$new();
      Result.cx = 320;
      Result.cy = 240;
      return Result;
    };
    this.Create$1 = function (AOwner) {
      this.CreateNew(AOwner,1);
      return this;
    };
    this.CreateNew = function (AOwner, Num) {
      pas.Controls.TControl.Create$1.call(this,AOwner);
      this.FActiveControl = null;
      this.FAlphaBlend = false;
      this.FAlphaBlendValue = 255;
      this.FDesignTimePPI = 96;
      this.FChildForm = null;
      this.FFormType = $mod.TFormType.ftWindow;
      this.FKeyPreview = false;
      this.FModalResult = 0;
      this.FModalResultProc = null;
      this.FOverlay = null;
      this.BeginUpdate();
      try {
        this.SetColor(16777215);
        this.SetParentFont(false);
        this.SetParentShowHint(false);
        this.SetVisible(false);
        var $with = this.$class.GetControlClassDefaultSize();
        this.SetBounds(0,0,$with.cx,$with.cy);
      } finally {
        this.EndUpdate();
      };
      return this;
    };
    this.Destroy = function () {
      this.FActiveControl = null;
      this.FChildForm = null;
      pas.Controls.TCustomControl.Destroy.call(this);
    };
    this.AfterConstruction = function () {
      pas.System.TObject.AfterConstruction.call(this);
      $mod.Application().UpdateMainForm(this);
      $mod.Application().RegisterModule(this);
      this.Loaded();
      this.DoCreate();
    };
    this.BeforeDestruction = function () {
      pas.Classes.TComponent.BeforeDestruction.call(this);
      $mod.Application().UnRegisterModule(this);
      this.DoDestroy();
    };
    this.Close = function () {
      var VAction = 0;
      var VIndex = 0;
      var VOwnerForm = null;
      var VModule = null;
      if (this.CloseQuery()) {
        VAction = $mod.TCloseAction.caHide;
        this.DoClose({get: function () {
            return VAction;
          }, set: function (v) {
            VAction = v;
          }});
        if (VAction !== $mod.TCloseAction.caNone) {
          if ($mod.Application().FMainForm === this) {
            $mod.Application().Terminate();
          } else {
            this.Hide();
            if (this.FFormType === $mod.TFormType.ftModalForm) {
              if ((this.FOwner != null) && $mod.TCustomForm.isPrototypeOf(this.FOwner)) {
                VOwnerForm = this.FOwner;
                VOwnerForm.FChildForm = null;
                if (VOwnerForm.FOverlay != null) {
                  VOwnerForm.FOverlay.$destroy("Destroy");
                  VOwnerForm.FOverlay = null;
                };
                VOwnerForm.Show();
              };
              if (this.FModalResultProc != null) {
                this.FModalResultProc(this,this.FModalResult);
              };
            } else {
              for (var $l = $mod.Application().GetModuleCount() - 1; $l >= 0; $l--) {
                VIndex = $l;
                VModule = $mod.Application().GetModule(VIndex);
                if ((VModule != null) && VModule.FVisible && (VModule !== this) && VModule.$class.InheritsFrom($mod.TCustomForm)) {
                  VModule.Show();
                  return;
                };
              };
              if ($mod.Application().FMainForm != null) {
                $mod.Application().FMainForm.Show();
              };
            };
          };
        };
      };
    };
    this.CloseQuery = function () {
      var Result = false;
      Result = true;
      if (this.FOnCloseQuery != null) {
        this.FOnCloseQuery(this,{get: function () {
            return Result;
          }, set: function (v) {
            Result = v;
          }});
      };
      return Result;
    };
    this.FocusControl = function (AControl) {
      if ((AControl != null) && AControl.CanSetFocus()) {
        AControl.SetFocus();
      };
    };
    this.Hide = function () {
      this.SetVisible(false);
      this.DoHide();
    };
    this.Loaded = function () {
      pas.Controls.TControl.Loaded.call(this);
    };
    this.Resize = function () {
      var VHeight = 0;
      var VLeft = 0;
      var VTop = 0;
      var VWidth = 0;
      var VWindowHeight = 0;
      var VWindowWidth = 0;
      VWindowWidth = window.innerWidth;
      VWindowHeight = window.innerHeight;
      var $tmp = this.FFormType;
      if ($tmp === $mod.TFormType.ftModalForm) {
        VWidth = this.FWidth;
        VHeight = this.FHeight;
        VWindowWidth = window.innerWidth;
        VWindowHeight = window.innerHeight;
        VLeft = rtl.trunc((VWindowWidth - VWidth) / 2);
        VTop = rtl.trunc((VWindowHeight - VHeight) / 2);
        this.SetBounds(VLeft,VTop,VWidth,VHeight);
      } else if ($tmp === $mod.TFormType.ftWindow) {
        this.SetBounds(0,0,VWindowWidth,VWindowHeight);
      } else if ($tmp === $mod.TFormType.ftTop) {
        this.SetBounds(0,this.FTop,this.FWidth,this.FHeight);
      };
      this.DoResize();
    };
    this.Show = function () {
      $mod.Application().FActiveForm = this;
      $mod.Application().SetTitle(this.GetText());
      this.BeginUpdate();
      try {
        this.SetVisible(true);
        this.Resize();
      } finally {
        this.EndUpdate();
      };
      this.BringToFront();
      this.SetFocus();
      this.DoShow();
    };
  });
  rtl.createClass(this,"TApplication",pas.Classes.TComponent,function () {
    this.$init = function () {
      pas.Classes.TComponent.$init.call(this);
      this.FModules = null;
      this.FActiveForm = null;
      this.FMainForm = null;
      this.FStopOnException = false;
      this.FTerminated = false;
      this.FTitle = "";
      this.FOnResize = null;
      this.FOnUnload = null;
    };
    this.$final = function () {
      this.FModules = undefined;
      this.FActiveForm = undefined;
      this.FMainForm = undefined;
      this.FOnResize = undefined;
      this.FOnUnload = undefined;
      pas.Classes.TComponent.$final.call(this);
    };
    this.GetApplicatioName = function () {
      var Result = "";
      Result = window.location.pathname;
      return Result;
    };
    this.GetModule = function (AIndex) {
      var Result = null;
      Result = rtl.getObject(this.FModules[AIndex]);
      return Result;
    };
    this.GetModuleCount = function () {
      var Result = 0;
      Result = this.FModules.length;
      return Result;
    };
    this.SetTitle = function (AValue) {
      if (this.FTitle !== AValue) {
        this.FTitle = AValue;
        document.title = this.FTitle;
      };
    };
    this.DoResize = function () {
      if (this.FOnResize != null) {
        this.FOnResize(this);
      };
    };
    this.DoUnload = function () {
      if (this.FOnUnload != null) {
        this.FOnUnload(this);
      };
    };
    this.LoadIcon = function () {
      var $with = document.head.appendChild(document.createElement("link"));
      $with.setAttribute("rel","icon");
      $with.setAttribute("type","image\/icon");
      $with.setAttribute("href",this.GetApplicatioName().replace("html","ico"));
    };
    this.RegisterHandleEvents = function () {
      window.addEventListener("error",rtl.createCallback(this,"HandleError"));
      window.addEventListener("resize",rtl.createSafeCallback(this,"HandleResize"));
      window.addEventListener("unload",rtl.createCallback(this,"HandleUnload"));
    };
    this.UnRegisterHandleEvents = function () {
      window.removeEventListener("error",rtl.createCallback(this,"HandleError"));
      window.removeEventListener("resize",rtl.createSafeCallback(this,"HandleResize"));
      window.removeEventListener("unload",rtl.createCallback(this,"HandleUnload"));
    };
    var CLE = pas.System.LineEnding;
    var CError = "Error Message: %s " + CLE + "Line Nro: %d " + CLE + "Column Nro: %d " + CLE;
    this.HandleError = function (AEvent) {
      var Result = false;
      if (AEvent.message.toLowerCase().indexOf("script error",0) > -1) {
        window.alert("Script Error: See Browser Console for Detail");
      } else {
        window.alert(pas.SysUtils.Format(CError,pas.System.VarRecs(18,AEvent.message,0,AEvent.lineno,0,AEvent.colno)));
      };
      if (this.FStopOnException) {
        this.Terminate();
      };
      AEvent.stopPropagation();
      Result = false;
      return Result;
    };
    this.HandleResize = function (AEvent) {
      var Result = false;
      var VControl = null;
      var VIndex = 0;
      AEvent.stopPropagation();
      this.DoResize();
      Result = true;
      for (var $l = 0, $end = this.FModules.length - 1; $l <= $end; $l++) {
        VIndex = $l;
        VControl = rtl.getObject(this.FModules[VIndex]);
        if ((VControl != null) && VControl.FVisible && VControl.$class.InheritsFrom($mod.TCustomForm)) {
          VControl.Resize();
        };
      };
      return Result;
    };
    this.HandleUnload = function (AEvent) {
      var Result = false;
      AEvent.stopPropagation();
      Result = true;
      try {
        this.DoUnload();
      } finally {
        this.Terminate();
      };
      return Result;
    };
    this.HandleException = function (AException) {
      if (pas.SysUtils.Exception.isPrototypeOf(AException)) {
        window.alert(pas.SysUtils.Format(rtl.getResStr(pas.LCLStrConsts,"rsErrUncaughtException"),pas.System.VarRecs(18,AException.$classname,18,AException.fMessage)));
      } else {
        window.alert(pas.SysUtils.Format(rtl.getResStr(pas.LCLStrConsts,"rsErrUncaughtObject"),pas.System.VarRecs(18,AException.$classname)));
      };
      if (this.FStopOnException) this.Terminate();
    };
    this.Create$1 = function (AOwner) {
      pas.Classes.TComponent.Create$1.call(this,AOwner);
      pas.p2jsres.SetResourceSource(pas.p2jsres.TResourceSource.rsJS);
      pas.SysUtils.SetOnUnCaughtExceptionHandler($impl.DoUncaughtPascalException);
      rtl.showUncaughtExceptions=true;
      this.FModules = new Array();
      this.FMainForm = null;
      this.FStopOnException = true;
      this.FTerminated = false;
      this.FTitle = "";
      return this;
    };
    this.Destroy = function () {
      this.FModules.length = 0;
      pas.Classes.TComponent.Destroy.call(this);
    };
    this.CreateForm = function (AInstanceClass, AReference) {
      try {
        AReference.set(AInstanceClass.$create("Create$1",[this]));
      } catch ($e) {
        AReference.set(null);
        throw $e;
      };
    };
    this.Initialize = function () {
    };
    this.Run = function () {
      this.RegisterHandleEvents();
      this.LoadIcon();
      if (this.FMainForm != null) {
        this.FMainForm.Show();
      };
    };
    this.Terminate = function () {
      var VModule = null;
      var VIndex = 0;
      if (!this.FTerminated) {
        this.UnRegisterHandleEvents();
        this.FTerminated = true;
        for (var $l = this.FModules.length - 1; $l >= 0; $l--) {
          VIndex = $l;
          VModule = rtl.getObject(this.FModules[VIndex]);
          if (VModule != null) {
            VModule.$destroy("Destroy");
            VModule = null;
          };
        };
      };
    };
    this.UpdateMainForm = function (AForm) {
      if (!(this.FMainForm != null)) {
        this.FMainForm = AForm;
        this.FActiveForm = AForm;
      };
    };
    this.RegisterModule = function (AModule) {
      if (AModule != null) {
        if (this.FModules.indexOf(AModule) === -1) {
          this.FModules.push(AModule);
          if (!document.body.contains(AModule.FHandleElement)) {
            document.body.appendChild(AModule.FHandleElement);
          };
        };
      };
    };
    this.UnRegisterModule = function (AModule) {
      var VIndex = 0;
      if (AModule != null) {
        VIndex = this.FModules.indexOf(AModule);
        if (VIndex >= 0) {
          this.FModules.splice(VIndex,1);
          if (document.body.contains(AModule.FHandleElement)) {
            document.body.removeChild(AModule.FHandleElement);
          };
        };
      };
    };
  });
  rtl.createClass(this,"TForm",this.TCustomForm,function () {
    var $r = this.$rtti;
    $r.addProperty("ActiveControl",2,pas.Controls.$rtti["TWinControl"],"FActiveControl","SetActiveControl");
    $r.addProperty("Align",2,pas.Controls.$rtti["TAlign"],"FAlign","SetAlign");
    $r.addProperty("AlphaBlend",2,rtl.boolean,"FAlphaBlend","SetAlphaBlend");
    $r.addProperty("AlphaBlendValue",2,rtl.byte,"FAlphaBlendValue","SetAlphaBlendValue");
    $r.addProperty("Caption",3,pas.Controls.$rtti["TCaption"],"GetText","SetText");
    $r.addProperty("ClientHeight",3,rtl.nativeint,"GetClientHeight","SetClientHeight");
    $r.addProperty("ClientWidth",3,rtl.nativeint,"GetClientWidth","SetClientWidth");
    $r.addProperty("Color",2,rtl.longint,"FColor","SetColor");
    $r.addProperty("DesignTimePPI",0,rtl.longint,"FDesignTimePPI","FDesignTimePPI");
    $r.addProperty("Enabled",2,rtl.boolean,"FEnabled","SetEnabled");
    $r.addProperty("Font",2,pas.Graphics.$rtti["TFont"],"FFont","SetFont");
    $r.addProperty("HandleClass",2,rtl.string,"FHandleClass","SetHandleClass");
    $r.addProperty("HandleId",2,rtl.string,"FHandleId","SetHandleId");
    $r.addProperty("KeyPreview",0,rtl.boolean,"FKeyPreview","FKeyPreview");
    $r.addProperty("ShowHint",2,rtl.boolean,"FShowHint","SetShowHint");
    $r.addProperty("Visible",2,rtl.boolean,"FVisible","SetVisible");
    $r.addProperty("OnActivate",0,pas.Classes.$rtti["TNotifyEvent"],"FOnActivate","FOnActivate");
    $r.addProperty("OnClick",0,pas.Classes.$rtti["TNotifyEvent"],"FOnClick","FOnClick");
    $r.addProperty("OnClose",0,$mod.$rtti["TCloseEvent"],"FOnClose","FOnClose");
    $r.addProperty("OnCloseQuery",0,$mod.$rtti["TCloseQueryEvent"],"FOnCloseQuery","FOnCloseQuery");
    $r.addProperty("OnCreate",0,pas.Classes.$rtti["TNotifyEvent"],"FOnCreate","FOnCreate");
    $r.addProperty("OnDblClick",0,pas.Classes.$rtti["TNotifyEvent"],"FOnDblClick","FOnDblClick");
    $r.addProperty("OnDeactivate",0,pas.Classes.$rtti["TNotifyEvent"],"FOnDeactivate","FOnDeactivate");
    $r.addProperty("OnDestroy",0,pas.Classes.$rtti["TNotifyEvent"],"FOnDestroy","FOnDestroy");
    $r.addProperty("OnHide",0,pas.Classes.$rtti["TNotifyEvent"],"FOnHide","FOnHide");
    $r.addProperty("OnKeyDown",0,pas.Controls.$rtti["TKeyEvent"],"FOnKeyDown","FOnKeyDown");
    $r.addProperty("OnKeyPress",0,pas.Controls.$rtti["TKeyPressEvent"],"FOnKeyPress","FOnKeyPress");
    $r.addProperty("OnKeyUp",0,pas.Controls.$rtti["TKeyEvent"],"FOnKeyUp","FOnKeyUp");
    $r.addProperty("OnMouseDown",0,pas.Controls.$rtti["TMouseEvent"],"FOnMouseDown","FOnMouseDown");
    $r.addProperty("OnMouseEnter",0,pas.Classes.$rtti["TNotifyEvent"],"FOnMouseEnter","FOnMouseEnter");
    $r.addProperty("OnMouseLeave",0,pas.Classes.$rtti["TNotifyEvent"],"FOnMouseLeave","FOnMouseLeave");
    $r.addProperty("OnMouseMove",0,pas.Controls.$rtti["TMouseMoveEvent"],"FOnMouseMove","FOnMouseMove");
    $r.addProperty("OnMouseUp",0,pas.Controls.$rtti["TMouseEvent"],"FOnMouseUp","FOnMouseUp");
    $r.addProperty("OnMouseWheel",0,pas.Controls.$rtti["TMouseWheelEvent"],"FOnMouseWheel","FOnMouseWheel");
    $r.addProperty("OnResize",0,pas.Classes.$rtti["TNotifyEvent"],"FOnResize$1","FOnResize$1");
    $r.addProperty("OnScroll",0,pas.Classes.$rtti["TNotifyEvent"],"FOnScroll$1","FOnScroll$1");
    $r.addProperty("OnShow",0,pas.Classes.$rtti["TNotifyEvent"],"FOnShow","FOnShow");
  });
  this.Application = function () {
    var Result = null;
    if (!($impl.VAppInstance != null)) {
      $impl.VAppInstance = $mod.TApplication.$create("Create$1",[null]);
    };
    Result = $impl.VAppInstance;
    return Result;
  };
  $mod.$implcode = function () {
    $impl.VAppInstance = null;
    $impl.DoUncaughtPascalException = function (E) {
      $mod.Application().HandleException(E);
    };
  };
},["LCLStrConsts","p2jsres"]);
rtl.module("Controls",["System","Classes","SysUtils","Types","JS","Web","Graphics"],function () {
  "use strict";
  var $mod = this;
  this.mrNone = 0;
  this.crDefault = 0;
  this.crNone = -1;
  this.crCross = -3;
  this.crIBeam = -4;
  this.crSize = -22;
  this.crSizeNESW = -6;
  this.crSizeNS = -7;
  this.crSizeNWSE = -8;
  this.crSizeWE = -9;
  this.crSizeNW = -23;
  this.crSizeN = -24;
  this.crSizeNE = -25;
  this.crSizeW = -26;
  this.crSizeE = -27;
  this.crSizeSW = -28;
  this.crSizeS = -29;
  this.crSizeSE = -30;
  this.crHourGlass = -11;
  this.crNoDrop = -13;
  this.crHSplit = -14;
  this.crVSplit = -15;
  this.crSQLWait = -17;
  this.crNo = -18;
  this.crAppStart = -19;
  this.crHelp = -20;
  this.crHandPoint = -21;
  this.$rtti.$Class("TWinControl");
  this.$rtti.$Class("TControl");
  this.TAlign = {"0": "alNone", alNone: 0, "1": "alTop", alTop: 1, "2": "alBottom", alBottom: 2, "3": "alLeft", alLeft: 3, "4": "alRight", alRight: 4, "5": "alClient", alClient: 5, "6": "alCustom", alCustom: 6};
  this.$rtti.$Enum("TAlign",{minvalue: 0, maxvalue: 6, ordtype: 1, enumtype: this.TAlign});
  this.TAnchorKind = {"0": "akTop", akTop: 0, "1": "akLeft", akLeft: 1, "2": "akRight", akRight: 2, "3": "akBottom", akBottom: 3};
  this.$rtti.$Enum("TAnchorKind",{minvalue: 0, maxvalue: 3, ordtype: 1, enumtype: this.TAnchorKind});
  this.$rtti.$Set("TAnchors",{comptype: this.$rtti["TAnchorKind"]});
  this.TBevelCut = {"0": "bvNone", bvNone: 0, "1": "bvLowered", bvLowered: 1, "2": "bvRaised", bvRaised: 2, "3": "bvSpace", bvSpace: 3};
  this.TFormBorderStyle = {"0": "bsNone", bsNone: 0, "1": "bsSingle", bsSingle: 1, "2": "bsSizeable", bsSizeable: 2, "3": "bsDialog", bsDialog: 3, "4": "bsToolWindow", bsToolWindow: 4, "5": "bsSizeToolWin", bsSizeToolWin: 5};
  this.$rtti.$Enum("TBorderStyle",{minvalue: 0, maxvalue: 1, ordtype: 1, enumtype: this.TFormBorderStyle});
  this.$rtti.$inherited("TCaption",rtl.string,{});
  this.$rtti.$Int("TCursor",{minvalue: -32768, maxvalue: 32767, ordtype: 2});
  rtl.createClass(this,"TControlCanvas",pas.Graphics.TCanvas,function () {
    this.$init = function () {
      pas.Graphics.TCanvas.$init.call(this);
      this.FControl = null;
      this.FHeight = 0;
      this.FWidth = 0;
    };
    this.$final = function () {
      this.FControl = undefined;
      pas.Graphics.TCanvas.$final.call(this);
    };
    this.SetHeight = function (AValue) {
      if (this.FHeight !== AValue) {
        this.FHeight = AValue;
        this.FCanvasElement.height = this.FHeight;
      };
    };
    this.SetWidth = function (AValue) {
      if (this.FWidth !== AValue) {
        this.FWidth = AValue;
        this.FCanvasElement.width = this.FWidth;
      };
    };
    this.Create$2 = function (AControl) {
      pas.Graphics.TCanvas.Create$1.call(this);
      if (AControl != null) {
        this.SetHeight(AControl.FHeight);
        this.SetWidth(AControl.FWidth);
        this.FFont.Assign(AControl.FFont);
        this.FBrush.SetColor(AControl.FColor);
        this.FPen.SetColor(AControl.FFont.FColor);
        this.FControl = AControl;
        this.FControl.FHandleElement.insertBefore(this.FCanvasElement,AControl.FHandleElement.firstChild);
      };
      return this;
    };
  });
  this.TShiftStateEnum = {"0": "ssShift", ssShift: 0, "1": "ssAlt", ssAlt: 1, "2": "ssCtrl", ssCtrl: 2, "3": "ssLeft", ssLeft: 3, "4": "ssRight", ssRight: 4, "5": "ssMIDdle", ssMIDdle: 5, "6": "ssDouble", ssDouble: 6};
  this.$rtti.$Enum("TShiftStateEnum",{minvalue: 0, maxvalue: 6, ordtype: 1, enumtype: this.TShiftStateEnum});
  this.$rtti.$Set("TShiftState",{comptype: this.$rtti["TShiftStateEnum"]});
  this.$rtti.$MethodVar("TKeyEvent",{procsig: rtl.newTIProcSig([["Sender",pas.System.$rtti["TObject"]],["Key",rtl.longint,1],["Shift",this.$rtti["TShiftState"]]]), methodkind: 0});
  this.$rtti.$MethodVar("TKeyPressEvent",{procsig: rtl.newTIProcSig([["Sender",pas.System.$rtti["TObject"]],["Key",rtl.char,1]]), methodkind: 0});
  this.TMouseButton = {"0": "mbLeft", mbLeft: 0, "1": "mbRight", mbRight: 1, "2": "mbMiddle", mbMiddle: 2};
  this.$rtti.$Enum("TMouseButton",{minvalue: 0, maxvalue: 2, ordtype: 1, enumtype: this.TMouseButton});
  this.$rtti.$MethodVar("TMouseEvent",{procsig: rtl.newTIProcSig([["Sender",pas.System.$rtti["TObject"]],["Button",this.$rtti["TMouseButton"]],["Shift",this.$rtti["TShiftState"]],["X",rtl.longint],["Y",rtl.longint]]), methodkind: 0});
  this.$rtti.$MethodVar("TMouseMoveEvent",{procsig: rtl.newTIProcSig([["Sender",pas.System.$rtti["TObject"]],["Shift",this.$rtti["TShiftState"]],["X",rtl.longint],["Y",rtl.longint]]), methodkind: 0});
  this.$rtti.$MethodVar("TMouseWheelEvent",{procsig: rtl.newTIProcSig([["Sender",pas.System.$rtti["TObject"]],["Shift",this.$rtti["TShiftState"]],["WheelDelta",rtl.nativeint],["MousePos",pas.Types.$rtti["TPoint"]],["Handled",rtl.boolean,1]]), methodkind: 0});
  this.TFocusSearchDirection = {"0": "fsdFirst", fsdFirst: 0, "1": "fsdLast", fsdLast: 1, "2": "fsdNext", fsdNext: 2, "3": "fsdPrev", fsdPrev: 3};
  this.TControlFlag = {"0": "cfInAlignControls", cfInAlignControls: 0};
  rtl.createClass(this,"TControlBorderSpacing",pas.Classes.TPersistent,function () {
    this.$init = function () {
      pas.Classes.TPersistent.$init.call(this);
      this.FAround = 0;
      this.FBottom = 0;
      this.FLeft = 0;
      this.FRight = 0;
      this.FTop = 0;
      this.FUpdateCount = 0;
      this.FOnChange = null;
    };
    this.$final = function () {
      this.FOnChange = undefined;
      pas.Classes.TPersistent.$final.call(this);
    };
    this.Changed = function () {
      if ((this.FUpdateCount === 0) && (this.FOnChange != null)) {
        this.FOnChange(this);
      };
    };
    this.Create$1 = function () {
      pas.System.TObject.Create.call(this);
      this.FBottom = 0;
      this.FLeft = 0;
      this.FRight = 0;
      this.FTop = 0;
      this.FUpdateCount = 0;
      return this;
    };
    this.Assign = function (Source) {
      var VSpacing = null;
      if ((Source != null) && $mod.TControlBorderSpacing.isPrototypeOf(Source)) {
        this.BeginUpdate();
        try {
          VSpacing = Source;
          this.FAround = VSpacing.FAround;
          this.FBottom = VSpacing.FBottom;
          this.FLeft = VSpacing.FLeft;
          this.FRight = VSpacing.FRight;
          this.FTop = VSpacing.FTop;
        } finally {
          this.EndUpdate();
        };
      } else {
        pas.Classes.TPersistent.Assign.call(this,Source);
      };
    };
    this.BeginUpdate = function () {
      this.FUpdateCount += 1;
    };
    this.EndUpdate = function () {
      if (this.FUpdateCount > 0) {
        this.FUpdateCount -= 1;
        if (this.FUpdateCount === 0) {
          this.Changed();
        };
      };
    };
  });
  rtl.createClass(this,"TControl",pas.Classes.TComponent,function () {
    this.$init = function () {
      pas.Classes.TComponent.$init.call(this);
      this.FAlign = 0;
      this.FAnchors = {};
      this.FAutoSize = false;
      this.FBorderSpacing = null;
      this.FBorderStyle = $mod.TFormBorderStyle.bsNone;
      this.FCaption = "";
      this.FColor = 0;
      this.FControlFlags = {};
      this.FControls = null;
      this.FCursor = 0;
      this.FDesignRect = pas.Types.TRect.$new();
      this.FEnabled = false;
      this.FFont = null;
      this.FHandleClass = "";
      this.FHandleElement = null;
      this.FHandleId = "";
      this.FHeight = 0;
      this.FHint = "";
      this.FLeft = 0;
      this.FParent = null;
      this.FParentColor = false;
      this.FParentFont = false;
      this.FParentShowHint = false;
      this.FShowHint = false;
      this.FTabOrder = 0;
      this.FTabStop = false;
      this.FTop = 0;
      this.FUpdateCount = 0;
      this.FVisible = false;
      this.FWidth = 0;
      this.FOnClick = null;
      this.FOnDblClick = null;
      this.FOnMouseDown = null;
      this.FOnMouseEnter = null;
      this.FOnMouseLeave = null;
      this.FOnMouseMove = null;
      this.FOnMouseUp = null;
      this.FOnMouseWheel = null;
      this.FOnResize = null;
      this.FOnScroll = null;
    };
    this.$final = function () {
      this.FAnchors = undefined;
      this.FBorderSpacing = undefined;
      this.FControlFlags = undefined;
      this.FControls = undefined;
      this.FDesignRect = undefined;
      this.FFont = undefined;
      this.FHandleElement = undefined;
      this.FParent = undefined;
      this.FOnClick = undefined;
      this.FOnDblClick = undefined;
      this.FOnMouseDown = undefined;
      this.FOnMouseEnter = undefined;
      this.FOnMouseLeave = undefined;
      this.FOnMouseMove = undefined;
      this.FOnMouseUp = undefined;
      this.FOnMouseWheel = undefined;
      this.FOnResize = undefined;
      this.FOnScroll = undefined;
      pas.Classes.TComponent.$final.call(this);
    };
    this.GetClientHeight = function () {
      var Result = 0;
      Result = this.GetClientRect().Bottom;
      return Result;
    };
    this.GetClientRect = function () {
      var Result = pas.Types.TRect.$new();
      Result.$assign(pas.Types.Rect(0,0,this.FWidth - 1,this.FHeight - 1));
      return Result;
    };
    this.GetClientWidth = function () {
      var Result = 0;
      Result = this.GetClientRect().Right;
      return Result;
    };
    this.GetText = function () {
      var Result = "";
      Result = this.RealGetText();
      return Result;
    };
    this.SetAlign = function (AValue) {
      if (this.FAlign !== AValue) {
        this.FAlign = AValue;
        if (this.FParent != null) {
          this.FParent.ReAlign()}
         else this.ReAlign();
      };
    };
    this.SetAnchors = function (AValue) {
      if (rtl.eqSet(this.FAnchors,AValue)) return;
      this.FAnchors = rtl.refSet(AValue);
    };
    this.SetAutoSize = function (AValue) {
      if (this.FAutoSize !== AValue) {
        this.FAutoSize = AValue;
        if (this.FAutoSize) {
          this.AdjustSize();
        };
      };
    };
    this.SetBorderSpacing = function (AValue) {
      this.FBorderSpacing.Assign(AValue);
    };
    this.SetBorderStyle = function (AValue) {
      if (this.FBorderStyle !== AValue) {
        this.FBorderStyle = AValue;
        this.Changed();
      };
    };
    this.SetClientSize = function (AValue) {
      var VClient = pas.Types.TRect.$new();
      VClient.$assign(this.GetClientRect());
      this.SetBounds(this.FLeft,this.FTop,(this.FWidth - VClient.Right) + AValue.x,(this.FHeight - VClient.Bottom) + AValue.y);
    };
    this.SetClientHeight = function (AValue) {
      this.SetClientSize(pas.Types.TPoint.$clone(pas.Types.Point(this.GetClientWidth(),AValue)));
    };
    this.SetClientWidth = function (AValue) {
      this.SetClientSize(pas.Types.TPoint.$clone(pas.Types.Point(AValue,this.GetClientHeight())));
    };
    this.SetColor = function (AValue) {
      if (this.FColor !== AValue) {
        this.FColor = AValue;
        this.FParentColor = false;
        this.ColorChanged(this);
      };
    };
    this.SetCursor = function (AValue) {
      if (this.FCursor !== AValue) {
        this.FCursor = AValue;
        this.Changed();
      };
    };
    this.SetEnabled = function (AValue) {
      if (this.FEnabled !== AValue) {
        this.FEnabled = AValue;
        this.Changed();
      };
    };
    this.SetFont = function (AValue) {
      if (!this.FFont.IsEqual(AValue)) {
        this.FFont.Assign(AValue);
      };
    };
    this.SetHandleClass = function (AValue) {
      if (this.FHandleClass !== AValue) {
        this.FHandleClass = AValue;
        this.Changed();
      };
    };
    this.SetHandleId = function (AValue) {
      if (this.FHandleId !== AValue) {
        this.FHandleId = AValue;
        this.Changed();
      };
    };
    this.SetHeight = function (AValue) {
      this.SetBounds(this.FLeft,this.FTop,this.FWidth,AValue);
    };
    this.SetHint = function (AValue) {
      if (this.FHint !== AValue) {
        this.FHint = AValue;
        this.Changed();
      };
    };
    this.SetLeft = function (AValue) {
      this.SetBounds(AValue,this.FTop,this.FWidth,this.FHeight);
    };
    this.SetParent = function (AValue) {
      if (this.FParent != null) {
        this.FParent.UnRegisterChild(this);
      };
      this.CheckNewParent(AValue);
      this.FParent = AValue;
      if (this.FParent != null) {
        this.FParent.RegisterChild(this);
        this.BeginUpdate();
        try {
          if (this.FParentColor) {
            this.FColor = this.FParent.FColor;
          };
          if (this.FParentFont) {
            this.FFont.Assign(this.FParent.FFont);
          };
          if (this.FParentShowHint) {
            this.FShowHint = this.FParent.FShowHint;
          };
        } finally {
          this.EndUpdate();
        };
      };
    };
    this.SetParentColor = function (AValue) {
      if (this.FParentColor !== AValue) {
        this.FParentColor = AValue;
        if (this.FParentColor && (this.FParent != null)) {
          this.FColor = this.FParent.FColor;
          this.Changed();
        };
      };
    };
    this.SetParentFont = function (AValue) {
      if (this.FParentFont !== AValue) {
        this.FParentFont = AValue;
        if (this.FParentFont && (this.FParent != null) && !this.FFont.IsEqual(this.FParent.FFont)) {
          this.FFont.Assign(this.FParent.FFont);
        };
      };
    };
    this.SetParentShowHint = function (AValue) {
      if (this.FParentShowHint !== AValue) {
        this.FParentShowHint = AValue;
        if (this.FParentShowHint && (this.FParent != null)) {
          this.FShowHint = this.FParent.FShowHint;
          this.Changed();
        };
      };
    };
    this.SetShowHint = function (AValue) {
      if (this.FShowHint !== AValue) {
        this.FShowHint = AValue;
        this.FParentShowHint = false;
        this.Changed();
      };
    };
    this.SetTabOrder = function (AValue) {
      if (this.FTabOrder !== AValue) {
        this.FTabOrder = AValue;
        if (this.FParent != null) {
          this.FParent.UpdateTabOrder(this);
        };
      };
    };
    this.SetTabStop = function (AValue) {
      if (this.FTabStop !== AValue) {
        this.FTabStop = AValue;
        this.Changed();
      };
    };
    this.SetText = function (AValue) {
      this.RealSetText(AValue);
    };
    this.SetTop = function (AValue) {
      this.SetBounds(this.FLeft,AValue,this.FWidth,this.FHeight);
    };
    this.SetVisible = function (AValue) {
      if (this.FVisible !== AValue) {
        this.FVisible = AValue;
        this.ReAlign();
      };
    };
    this.SetWidth = function (AValue) {
      this.SetBounds(this.FLeft,this.FTop,AValue,this.FHeight);
    };
    this.Click = function () {
      if (this.FOnClick != null) {
        this.FOnClick(this);
      };
    };
    this.DblClick = function () {
      if (this.FOnDblClick != null) {
        this.FOnDblClick(this);
      };
    };
    this.DoResize = function () {
      if (this.FOnResize != null) {
        this.FOnResize(this);
      };
    };
    this.DoScroll = function () {
      if (this.FOnScroll != null) {
        this.FOnScroll(this);
      };
    };
    this.MouseDown = function (Button, Shift, X, Y) {
      if (this.FOnMouseDown != null) {
        this.FOnMouseDown(this,Button,rtl.refSet(Shift),X,Y);
      };
    };
    this.MouseEnter = function () {
      if (this.FOnMouseEnter != null) {
        this.FOnMouseEnter(this);
      };
    };
    this.MouseLeave = function () {
      if (this.FOnMouseLeave != null) {
        this.FOnMouseLeave(this);
      };
    };
    this.MouseMove = function (Shift, X, Y) {
      if (this.FOnMouseMove != null) {
        this.FOnMouseMove(this,rtl.refSet(Shift),X,Y);
      };
    };
    this.MouseUp = function (Button, Shift, X, Y) {
      if (this.FOnMouseUp != null) {
        this.FOnMouseUp(this,Button,rtl.refSet(Shift),X,Y);
      };
    };
    this.MouseWeel = function (Shift, WheelDelta, MousePos, Handled) {
      if (this.FOnMouseWheel != null) {
        this.FOnMouseWheel(this,rtl.refSet(Shift),WheelDelta,pas.Types.TPoint.$clone(MousePos),Handled);
      };
    };
    this.HandleClick = function (AEvent) {
      var Result = false;
      AEvent.stopPropagation();
      this.Click();
      Result = true;
      return Result;
    };
    this.HandleDblClick = function (AEvent) {
      var Result = false;
      AEvent.stopPropagation();
      this.DblClick();
      Result = true;
      return Result;
    };
    this.HandleMouseDown = function (AEvent) {
      var Result = false;
      var VButton = 0;
      var VOffSets = pas.Types.TRect.$new();
      var VShift = {};
      var X = 0;
      var Y = 0;
      VButton = $mod.ExtractMouseButton(AEvent);
      VOffSets.$assign($mod.OffSets(this.FHandleElement));
      VShift = rtl.refSet($mod.ExtractShiftState$1(AEvent));
      X = pas.System.Trunc(AEvent.clientX - VOffSets.Left);
      Y = pas.System.Trunc(AEvent.clientY - VOffSets.Top);
      AEvent.stopPropagation();
      this.MouseDown(VButton,rtl.refSet(VShift),X,Y);
      Result = true;
      return Result;
    };
    this.HandleMouseEnter = function (AEvent) {
      var Result = false;
      AEvent.stopPropagation();
      this.MouseEnter();
      Result = true;
      return Result;
    };
    this.HandleMouseLeave = function (AEvent) {
      var Result = false;
      AEvent.stopPropagation();
      this.MouseLeave();
      Result = true;
      return Result;
    };
    this.HandleMouseMove = function (AEvent) {
      var Result = false;
      var VOffSets = pas.Types.TRect.$new();
      var VShift = {};
      var X = 0;
      var Y = 0;
      VOffSets.$assign($mod.OffSets(this.FHandleElement));
      VShift = rtl.refSet($mod.ExtractShiftState$1(AEvent));
      X = pas.System.Trunc(AEvent.clientX - VOffSets.Left);
      Y = pas.System.Trunc(AEvent.clientY - VOffSets.Left);
      AEvent.stopPropagation();
      this.MouseMove(rtl.refSet(VShift),X,Y);
      Result = true;
      return Result;
    };
    this.HandleMouseUp = function (AEvent) {
      var Result = false;
      var VButton = 0;
      var VOffSets = pas.Types.TRect.$new();
      var VShift = {};
      var X = 0;
      var Y = 0;
      VButton = $mod.ExtractMouseButton(AEvent);
      VOffSets.$assign($mod.OffSets(this.FHandleElement));
      VShift = rtl.refSet($mod.ExtractShiftState$1(AEvent));
      X = pas.System.Trunc(AEvent.clientX - VOffSets.Left);
      Y = pas.System.Trunc(AEvent.clientY - VOffSets.Top);
      AEvent.stopPropagation();
      this.MouseUp(VButton,rtl.refSet(VShift),X,Y);
      Result = true;
      return Result;
    };
    this.HandleMouseWheel = function (AEvent) {
      var Result = false;
      var VDelta = 0;
      var VHandled = false;
      var VMousePos = pas.Types.TPoint.$new();
      var VShift = {};
      var VOffSets = pas.Types.TRect.$new();
      VDelta = pas.System.Trunc(-AEvent.deltaY);
      VHandled = false;
      VOffSets.$assign($mod.OffSets(this.FHandleElement));
      VMousePos.$assign(pas.Types.Point(VOffSets.Left,VOffSets.Top));
      VShift = rtl.refSet($mod.ExtractShiftState$1(AEvent));
      AEvent.stopPropagation();
      this.MouseWeel(rtl.refSet(VShift),VDelta,pas.Types.TPoint.$clone(VMousePos),{get: function () {
          return VHandled;
        }, set: function (v) {
          VHandled = v;
        }});
      Result = true;
      return Result;
    };
    this.HandleResize = function (AEvent) {
      var Result = false;
      AEvent.stopPropagation();
      this.DoResize();
      Result = true;
      return Result;
    };
    this.HandleScroll = function (AEvent) {
      var Result = false;
      AEvent.stopPropagation();
      this.DoScroll();
      Result = true;
      return Result;
    };
    this.Loaded = function () {
      pas.Classes.TComponent.Loaded.call(this);
      this.FDesignRect.$assign(pas.Types.Rect(this.FLeft,this.FTop,(this.FLeft + this.FWidth) - 1,(this.FTop + this.FHeight) - 1));
      this.Changed();
    };
    this.Changed = function () {
      var $Self = this;
      var form = null;
      function AdjustWithPPI(aValue) {
        var Result = 0;
        if (form != null) {
          Result = pas.System.Trunc((96 * aValue) / form.FDesignTimePPI)}
         else Result = aValue;
        return Result;
      };
      function FindParentForm() {
        var Result = null;
        var p = null;
        p = $Self.FParent;
        while ((p != null) && !pas.Forms.TCustomForm.isPrototypeOf(p)) p = p.FParent;
        if (pas.Forms.TCustomForm.isPrototypeOf(p)) {
          Result = p}
         else Result = null;
        return Result;
      };
      if (!this.IsUpdating() && !(pas.Classes.TComponentStateItem.csLoading in this.FComponentState)) {
        form = FindParentForm();
        var $with = this.FHandleElement;
        if (this.FHandleId !== "") {
          $with.setAttribute("id",this.FHandleId);
        } else {
          $with.removeAttribute("id");
        };
        if (this.FHandleClass !== "") {
          $with.setAttribute("class",this.FHandleClass);
        } else {
          $with.removeAttribute("class");
        };
        if ((this.FHandleClass === "") && (this.FHandleId === "")) {
          if (this.FColor in rtl.createSet(536870912,536870911)) {
            $with.style.removeProperty("background-color");
          } else {
            $with.style.setProperty("background-color",pas.Graphics.JSColor(this.FColor));
          };
        };
        $with.style.setProperty("left",pas.SysUtils.IntToStr(AdjustWithPPI(this.FLeft)) + "px");
        $with.style.setProperty("top",pas.SysUtils.IntToStr(AdjustWithPPI(this.FTop)) + "px");
        $with.style.setProperty("width",pas.SysUtils.IntToStr(AdjustWithPPI(this.FWidth)) + "px");
        $with.style.setProperty("height",pas.SysUtils.IntToStr(AdjustWithPPI(this.FHeight)) + "px");
        $with.style.setProperty("cursor",$mod.JSCursor(this.FCursor));
        if (this.FEnabled) {
          $with.removeAttribute("disabled");
          $with.style.removeProperty("opacity");
        } else {
          $with.setAttribute("disabled","true");
          $with.style.setProperty("opacity","0.5");
        };
        if (this.FVisible) {
          $with.style.setProperty("display","block");
        } else {
          $with.style.setProperty("display","none");
        };
        if ((this.FHint !== "") && this.FShowHint) {
          $with.setAttribute("title",this.FHint);
        } else {
          $with.removeAttribute("title");
        };
        if (this.FBorderStyle === $mod.TFormBorderStyle.bsNone) {
          $with.style.setProperty("border-style","none");
        } else {
          $with.style.removeProperty("border-style");
        };
        $with.style.setProperty("position","absolute");
      };
    };
    this.CreateHandleElement = function () {
      var Result = null;
      throw new Error(pas.SysUtils.Format("%s.CreateHandleElement=nil",pas.System.VarRecs(18,this.$classname)));
      return Result;
    };
    this.RegisterHandleEvents = function () {
      var $with = this.FHandleElement;
      $with.addEventListener("click",rtl.createCallback(this,"HandleClick"));
      $with.addEventListener("dblclick",rtl.createCallback(this,"HandleDblClick"));
      $with.addEventListener("mousedown",rtl.createCallback(this,"HandleMouseDown"));
      $with.addEventListener("mouseenter",rtl.createCallback(this,"HandleMouseEnter"));
      $with.addEventListener("mouseleave",rtl.createCallback(this,"HandleMouseLeave"));
      $with.addEventListener("mousemove",rtl.createCallback(this,"HandleMouseMove"));
      $with.addEventListener("mouseup",rtl.createCallback(this,"HandleMouseUp"));
      $with.addEventListener("scroll",rtl.createSafeCallback(this,"HandleScroll"));
      $with.addEventListener("resize",rtl.createSafeCallback(this,"HandleResize"));
      $with.addEventListener("wheel",rtl.createCallback(this,"HandleMouseWheel"));
    };
    this.UnRegisterHandleEvents = function () {
      var $with = this.FHandleElement;
      $with.removeEventListener("click",rtl.createCallback(this,"HandleClick"));
      $with.removeEventListener("dblclick",rtl.createCallback(this,"HandleDblClick"));
      $with.removeEventListener("mousedown",rtl.createCallback(this,"HandleMouseDown"));
      $with.removeEventListener("mouseenter",rtl.createCallback(this,"HandleMouseEnter"));
      $with.removeEventListener("mouseleave",rtl.createCallback(this,"HandleMouseLeave"));
      $with.removeEventListener("mousemove",rtl.createCallback(this,"HandleMouseMove"));
      $with.removeEventListener("mouseup",rtl.createCallback(this,"HandleMouseUp"));
      $with.removeEventListener("scroll",rtl.createSafeCallback(this,"HandleScroll"));
      $with.removeEventListener("resize",rtl.createSafeCallback(this,"HandleResize"));
      $with.removeEventListener("wheel",rtl.createCallback(this,"HandleMouseWheel"));
    };
    this.CheckNewParent = function (AParent) {
      if ((AParent != null) && !AParent.CheckChildClassAllowed(this.$class.ClassType())) {
        throw new Error(pas.SysUtils.Format("Control of class '%s' can't have control of class '%s' as a child",pas.System.VarRecs(8,AParent.$class.ClassType(),18,this.$classname)));
      };
      if (pas.Forms.TCustomForm.isPrototypeOf(this) && pas.Forms.TCustomForm.isPrototypeOf(AParent)) {
        throw new Error('A "Form" can\'t have another "Form" as parent');
      };
      if (this === AParent) {
        throw new Error('A "Control" can\'t have itself as a Parent');
      };
    };
    this.RegisterChild = function (AControl) {
      var VIndex = 0;
      if (AControl != null) {
        VIndex = this.FControls.indexOf(AControl);
        if (VIndex < 0) {
          this.FControls.push(AControl);
          if (!this.FHandleElement.contains(AControl.FHandleElement)) {
            this.FHandleElement.appendChild(AControl.FHandleElement);
          };
          this.ReAlign();
          AControl.SetTabOrder(this.FControls.length);
        };
      };
    };
    this.UnRegisterChild = function (AControl) {
      var VIndex = 0;
      if (AControl != null) {
        VIndex = this.FControls.indexOf(AControl);
        if (VIndex >= 0) {
          this.FControls.splice(VIndex,1);
          if (this.FHandleElement.contains(AControl.FHandleElement)) {
            this.FHandleElement.removeChild(AControl.FHandleElement);
          };
          this.ReAlign();
          this.UpdateTabOrder(null);
        };
      };
    };
    this.AlignControls = function () {
      var $Self = this;
      var VControl = null;
      var VSpacing = null;
      var VIndex = 0;
      var VLeft = 0;
      var VTop = 0;
      var VRight = 0;
      var VBotton = 0;
      var VWidth = 0;
      var newleft = 0;
      var newtop = 0;
      var newright = 0;
      var newbottom = 0;
      if ($mod.TControlFlag.cfInAlignControls in this.FControlFlags) return;
      this.FControlFlags = rtl.includeSet(this.FControlFlags,$mod.TControlFlag.cfInAlignControls);
      this.BeginUpdate();
      try {
        VLeft = 0;
        VTop = 0;
        VRight = this.FWidth;
        VBotton = this.FHeight;
        VWidth = this.FWidth;
        for (var $l = 0, $end = this.FControls.length - 1; $l <= $end; $l++) {
          VIndex = $l;
          VControl = rtl.getObject(this.FControls[VIndex]);
          if ((VControl != null) && (VControl.FAlign === $mod.TAlign.alTop) && VControl.FVisible) {
            VControl.BeginUpdate();
            try {
              VSpacing = VControl.FBorderSpacing;
              VControl.SetLeft(VLeft + VSpacing.FLeft + VSpacing.FAround);
              VControl.SetTop(VTop + VSpacing.FTop + VSpacing.FAround);
              VControl.SetWidth(VWidth - VSpacing.FLeft - VSpacing.FRight - (VSpacing.FAround * 2));
              VControl.SetHeight(VControl.FHeight);
            } finally {
              VControl.EndUpdate();
            };
            VTop = VTop + VControl.FHeight + VSpacing.FTop + VSpacing.FBottom + (VSpacing.FAround * 2);
          };
        };
        if (VTop < 0) {
          VTop = 0;
        };
        for (var $l1 = 0, $end1 = this.FControls.length - 1; $l1 <= $end1; $l1++) {
          VIndex = $l1;
          VControl = rtl.getObject(this.FControls[VIndex]);
          if ((VControl != null) && (VControl.FAlign === $mod.TAlign.alBottom) && VControl.FVisible) {
            VControl.BeginUpdate();
            try {
              VSpacing = VControl.FBorderSpacing;
              VControl.SetLeft(VLeft + VSpacing.FLeft + VSpacing.FAround);
              if (!($mod.TAnchorKind.akBottom in VControl.FAnchors)) VControl.SetTop(VBotton - VControl.FHeight - VSpacing.FBottom - VSpacing.FAround);
              VControl.SetWidth(VWidth - VSpacing.FLeft - VSpacing.FRight - (VSpacing.FAround * 2));
              VControl.SetHeight(VControl.FHeight);
            } finally {
              VControl.EndUpdate();
            };
            VBotton = VBotton - VControl.FHeight - VSpacing.FTop - VSpacing.FBottom - (VSpacing.FAround * 2);
          };
        };
        if (VBotton < 0) {
          VBotton = 0;
        };
        for (var $l2 = 0, $end2 = this.FControls.length - 1; $l2 <= $end2; $l2++) {
          VIndex = $l2;
          VControl = rtl.getObject(this.FControls[VIndex]);
          if ((VControl != null) && (VControl.FAlign === $mod.TAlign.alLeft) && VControl.FVisible) {
            VControl.BeginUpdate();
            try {
              VSpacing = VControl.FBorderSpacing;
              VControl.SetLeft(VLeft + VSpacing.FLeft + VSpacing.FAround);
              VControl.SetTop(VTop + VSpacing.FTop + VSpacing.FAround);
              VControl.SetWidth(VControl.FWidth);
              VControl.SetHeight(VBotton - VTop - VSpacing.FTop - VSpacing.FBottom - (VSpacing.FAround * 2));
            } finally {
              VControl.EndUpdate();
            };
            VLeft = VLeft + VControl.FWidth + VSpacing.FLeft + VSpacing.FRight + (VSpacing.FAround * 2);
          };
        };
        if (VLeft < 0) {
          VLeft = 0;
        };
        for (var $l3 = 0, $end3 = this.FControls.length - 1; $l3 <= $end3; $l3++) {
          VIndex = $l3;
          VControl = rtl.getObject(this.FControls[VIndex]);
          if ((VControl != null) && (VControl.FAlign === $mod.TAlign.alRight) && VControl.FVisible) {
            VControl.BeginUpdate();
            try {
              VSpacing = VControl.FBorderSpacing;
              if (!($mod.TAnchorKind.akLeft in VControl.FAnchors)) VControl.SetLeft(VRight - VControl.FWidth - VSpacing.FRight - VSpacing.FAround);
              VControl.SetTop(VTop + VSpacing.FTop + VSpacing.FAround);
              VControl.SetWidth(VControl.FWidth);
              VControl.SetHeight(VBotton - VTop - VSpacing.FTop - VSpacing.FBottom - (VSpacing.FAround * 2));
            } finally {
              VControl.EndUpdate();
            };
            VRight = VRight - VControl.FWidth - VSpacing.FLeft - VSpacing.FRight - (VSpacing.FAround * 2);
          };
        };
        if (VRight < 0) {
          VRight = 0;
        };
        for (var $l4 = 0, $end4 = this.FControls.length - 1; $l4 <= $end4; $l4++) {
          VIndex = $l4;
          VControl = rtl.getObject(this.FControls[VIndex]);
          if ((VControl != null) && (VControl.FAlign === $mod.TAlign.alClient) && VControl.FVisible) {
            VControl.BeginUpdate();
            try {
              VSpacing = VControl.FBorderSpacing;
              VControl.SetLeft(VLeft + VSpacing.FLeft + VSpacing.FAround);
              VControl.SetTop(VTop + VSpacing.FTop + VSpacing.FAround);
              VControl.SetWidth(VRight - VLeft - VSpacing.FLeft - VSpacing.FRight - (VSpacing.FAround * 2));
              VControl.SetHeight(VBotton - VTop - VSpacing.FTop - VSpacing.FBottom - (VSpacing.FAround * 2));
            } finally {
              VControl.EndUpdate();
            };
          };
        };
        for (var $l5 = 0, $end5 = this.FControls.length - 1; $l5 <= $end5; $l5++) {
          VIndex = $l5;
          VControl = rtl.getObject(this.FControls[VIndex]);
          if ((VControl != null) && (VControl.FAlign === $mod.TAlign.alNone) && VControl.FVisible && rtl.neSet(VControl.FAnchors,{})) {
            VControl.BeginUpdate();
            try {
              if ($mod.TAnchorKind.akLeft in VControl.FAnchors) newleft = VControl.FLeft;
              if ($mod.TAnchorKind.akTop in VControl.FAnchors) newtop = VControl.FTop;
              if ($mod.TAnchorKind.akBottom in VControl.FAnchors) newbottom = this.FHeight - (this.FDesignRect.Bottom - VControl.FDesignRect.Bottom);
              if ($mod.TAnchorKind.akRight in VControl.FAnchors) newright = this.FWidth - (this.FDesignRect.Right - VControl.FDesignRect.Right);
              if (rtl.leSet(rtl.createSet($mod.TAnchorKind.akLeft,$mod.TAnchorKind.akRight),VControl.FAnchors)) {
                VControl.SetLeft(newleft);
                VControl.SetWidth((newright - newleft) + 1);
              } else if ($mod.TAnchorKind.akLeft in VControl.FAnchors) {
                VControl.SetLeft(newleft)}
               else if ($mod.TAnchorKind.akRight in VControl.FAnchors) VControl.SetLeft(newright - VControl.FWidth);
              if (rtl.leSet(rtl.createSet($mod.TAnchorKind.akTop,$mod.TAnchorKind.akBottom),VControl.FAnchors)) {
                VControl.SetTop(newtop);
                VControl.SetHeight((newbottom - newtop) + 1);
              } else if ($mod.TAnchorKind.akTop in VControl.FAnchors) {
                VControl.SetTop(newtop)}
               else if ($mod.TAnchorKind.akBottom in VControl.FAnchors) VControl.SetTop(newbottom - VControl.FHeight);
            } finally {
              VControl.EndUpdate();
            };
          };
        };
      } finally {
        this.FControlFlags = rtl.excludeSet(this.FControlFlags,$mod.TControlFlag.cfInAlignControls);
        this.EndUpdate();
      };
    };
    this.RealGetText = function () {
      var Result = "";
      Result = this.FCaption;
      return Result;
    };
    this.RealSetText = function (AValue) {
      if (this.FCaption !== AValue) {
        this.FCaption = AValue;
        this.Changed();
      };
    };
    this.BorderSpacingChanged = function (Sender) {
      if (this.FParent != null) {
        this.FParent.AlignControls();
      };
    };
    this.ColorChanged = function (Sender) {
      this.Changed();
    };
    this.FontChanged = function (Sender) {
      this.Changed();
    };
    this.TabOrderArray = function () {
      var Result = null;
      Result = this.FControls.slice(0).sort(rtl.createCallback(this,"CompareTabOrder"));
      return Result;
    };
    this.CompareTabOrder = function (A, B) {
      var Result = 0;
      if (pas.System.Assigned(A) && pas.System.Assigned(B) && rtl.isExt(A,$mod.TControl,1) && rtl.isExt(B,$mod.TControl,1)) {
        Result = rtl.getObject(A).FTabOrder - rtl.getObject(B).FTabOrder;
      } else {
        Result = 0;
      };
      return Result;
    };
    this.UpdateTabOrder = function (AValue) {
      var VControl = null;
      var VArray = null;
      var VIndex = 0;
      if (AValue != null) {
        for (var $l = 0, $end = this.FControls.length - 1; $l <= $end; $l++) {
          VIndex = $l;
          VControl = rtl.getObject(this.FControls[VIndex]);
          if ((VControl != null) && (VControl !== AValue) && (VControl.FTabOrder >= AValue.FTabOrder)) {
            VControl.FTabOrder += 1;
          };
        };
      };
      VArray = this.TabOrderArray();
      try {
        for (var $l1 = 0, $end1 = VArray.length - 1; $l1 <= $end1; $l1++) {
          VIndex = $l1;
          VControl = rtl.getObject(VArray[VIndex]);
          if (VControl != null) {
            VControl.BeginUpdate();
            try {
              VControl.FTabOrder = VIndex;
            } finally {
              VControl.EndUpdate();
            };
          };
        };
      } finally {
        VArray.length = 0;
      };
    };
    this.GetControlClassDefaultSize = function () {
      var Result = pas.Types.TSize.$new();
      Result.cx = 75;
      Result.cy = 50;
      return Result;
    };
    this.Create$1 = function (AOwner) {
      var sz = pas.Types.TSize.$new();
      pas.Classes.TComponent.Create$1.call(this,AOwner);
      this.FHandleElement = this.CreateHandleElement();
      this.FHandleClass = this.$classname;
      this.FHandleId = "";
      this.RegisterHandleEvents();
      this.FControls = new Array();
      this.FBorderSpacing = $mod.TControlBorderSpacing.$create("Create$1");
      this.FBorderSpacing.FOnChange = rtl.createCallback(this,"BorderSpacingChanged");
      this.FBorderStyle = $mod.TFormBorderStyle.bsSingle;
      this.FFont = pas.Graphics.TFont.$create("Create$1");
      this.FFont.FOnChange = rtl.createCallback(this,"FontChanged");
      this.FAlign = $mod.TAlign.alNone;
      this.FAnchors = rtl.createSet($mod.TAnchorKind.akLeft,$mod.TAnchorKind.akTop);
      this.FAutoSize = false;
      this.FCaption = "";
      this.FColor = 536870912;
      this.FCursor = 0;
      sz.$assign(this.$class.GetControlClassDefaultSize());
      this.FDesignRect.$assign(pas.Types.Rect(0,0,sz.cx - 1,sz.cy - 1));
      this.FEnabled = true;
      this.FLeft = 0;
      this.FParent = null;
      this.FParentColor = false;
      this.FParentFont = true;
      this.FParentShowHint = true;
      this.FShowHint = false;
      this.FTabOrder = 0;
      this.FTabStop = true;
      this.FTop = 0;
      this.FUpdateCount = 0;
      this.FVisible = true;
      return this;
    };
    this.Destroy = function () {
      this.DestroyComponents();
      if (this.FHandleElement != null) this.UnRegisterHandleEvents();
      if (this.FParent != null) {
        this.FParent.UnRegisterChild(this);
      };
      this.FControls.length = 0;
      this.FBorderSpacing.$destroy("Destroy");
      this.FBorderSpacing = null;
      this.FFont.$destroy("Destroy");
      this.FFont = null;
      pas.Classes.TComponent.Destroy.call(this);
    };
    this.BeginUpdate = function () {
      this.FUpdateCount += 1;
    };
    this.EndUpdate = function () {
      if (this.FUpdateCount > 0) {
        this.FUpdateCount -= 1;
        if (this.FUpdateCount === 0) {
          this.Changed();
        };
      };
    };
    this.AdjustSize = function () {
    };
    this.IsUpdating = function () {
      var Result = false;
      Result = this.FUpdateCount > 0;
      return Result;
    };
    this.Invalidate = function () {
    };
    this.ReAlign = function () {
      this.AlignControls();
      if (this.FParent != null) {
        this.FParent.ReAlign();
      };
      this.Invalidate();
    };
    this.BringToFront = function () {
      var VParentElement = null;
      VParentElement = this.FHandleElement.parentElement;
      if (VParentElement != null) {
        VParentElement.removeChild(this.FHandleElement);
        VParentElement.appendChild(this.FHandleElement);
      };
    };
    this.SetBounds = function (ALeft, ATop, AWidth, AHeight) {
      if ((this.FLeft !== ALeft) || (this.FTop !== ATop) || (this.FWidth !== AWidth) || (this.FHeight !== AHeight)) {
        this.FLeft = ALeft;
        this.FTop = ATop;
        if (AWidth > 0) {
          this.FWidth = AWidth;
        } else {
          this.FWidth = 0;
        };
        if (AHeight > 0) {
          this.FHeight = AHeight;
        } else {
          this.FHeight = 0;
        };
        this.Changed();
        this.ReAlign();
      };
    };
    var $r = this.$rtti;
    $r.addProperty("Cursor",2,$mod.$rtti["TCursor"],"FCursor","SetCursor");
    $r.addProperty("Left",2,rtl.nativeint,"FLeft","SetLeft");
    $r.addProperty("Height",2,rtl.nativeint,"FHeight","SetHeight");
    $r.addProperty("Hint",2,rtl.string,"FHint","SetHint");
    $r.addProperty("Top",2,rtl.nativeint,"FTop","SetTop");
    $r.addProperty("Width",2,rtl.nativeint,"FWidth","SetWidth");
  });
  rtl.createClass(this,"TWinControl",this.TControl,function () {
    this.$init = function () {
      $mod.TControl.$init.call(this);
      this.FOnEnter = null;
      this.FOnExit = null;
      this.FOnKeyDown = null;
      this.FOnKeyPress = null;
      this.FOnKeyUp = null;
    };
    this.$final = function () {
      this.FOnEnter = undefined;
      this.FOnExit = undefined;
      this.FOnKeyDown = undefined;
      this.FOnKeyPress = undefined;
      this.FOnKeyUp = undefined;
      $mod.TControl.$final.call(this);
    };
    this.DoEnter = function () {
      if (this.FOnEnter != null) {
        this.FOnEnter(this);
      };
    };
    this.DoExit = function () {
      if (this.FOnExit != null) {
        this.FOnExit(this);
      };
    };
    this.KeyDown = function (Key, Shift) {
      if (this.FOnKeyDown != null) {
        this.FOnKeyDown(this,Key,rtl.refSet(Shift));
      };
    };
    this.KeyPress = function (Key) {
      if (this.FOnKeyPress != null) {
        this.FOnKeyPress(this,Key);
      };
    };
    this.KeyUp = function (Key, Shift) {
      if (this.FOnKeyUp != null) {
        this.FOnKeyUp(this,Key,rtl.refSet(Shift));
      };
    };
    this.HandleEnter = function (AEvent) {
      var Result = false;
      var VParent = null;
      VParent = this.FParent;
      while (VParent != null) {
        if (pas.Forms.TCustomForm.isPrototypeOf(VParent)) {
          VParent.SetActiveControl(this);
          break;
        };
        VParent = VParent.FParent;
      };
      AEvent.stopPropagation();
      this.DoEnter();
      Result = true;
      return Result;
    };
    this.HandleExit = function (AEvent) {
      var Result = false;
      AEvent.stopPropagation();
      this.DoExit();
      Result = true;
      return Result;
    };
    this.HandleKeyDown = function (AEvent) {
      var Result = false;
      var VControl = null;
      var VForm = null;
      var VKey = 0;
      var VParent = null;
      var VShift = {};
      VParent = this.FParent;
      while (VParent != null) {
        if (pas.Forms.TCustomForm.isPrototypeOf(VParent)) {
          VForm = VParent;
          if (VForm.FKeyPreview && VForm.HandleKeyDown(AEvent)) {
            Result = true;
            return Result;
          };
        };
        VParent = VParent.FParent;
      };
      VKey = $mod.ExtractKeyCode(AEvent);
      VShift = rtl.refSet($mod.ExtractShiftState(AEvent));
      AEvent.stopPropagation();
      this.KeyDown({get: function () {
          return VKey;
        }, set: function (v) {
          VKey = v;
        }},rtl.refSet(VShift));
      if (VKey === 0) {
        AEvent.preventDefault();
      } else {
        var $tmp = VKey;
        if ($tmp === 9) {
          if (this.FParent != null) {
            if ($mod.TShiftStateEnum.ssShift in VShift) {
              VControl = this.FParent.FindFocusControl(this,$mod.TFocusSearchDirection.fsdPrev);
              if (!(VControl != null)) {
                VControl = this.FParent.FindFocusControl(null,$mod.TFocusSearchDirection.fsdLast);
              };
            } else {
              VControl = this.FParent.FindFocusControl(this,$mod.TFocusSearchDirection.fsdNext);
              if (!(VControl != null)) {
                VControl = this.FParent.FindFocusControl(null,$mod.TFocusSearchDirection.fsdFirst);
              };
            };
            if ((VControl != null) && VControl.CanSetFocus()) {
              VControl.SetFocus();
            };
            AEvent.preventDefault();
          };
        };
      };
      Result = true;
      return Result;
    };
    this.HandleKeyUp = function (AEvent) {
      var Result = false;
      var VForm = null;
      var VKey = 0;
      var VParent = null;
      var VShift = {};
      VParent = this.FParent;
      while (VParent != null) {
        if (pas.Forms.TCustomForm.isPrototypeOf(VParent)) {
          VForm = VParent;
          if (VForm.FKeyPreview && VForm.HandleKeyUp(AEvent)) {
            Result = true;
            return Result;
          };
        };
        VParent = VParent.FParent;
      };
      VKey = $mod.ExtractKeyCode(AEvent);
      VShift = rtl.refSet($mod.ExtractShiftState(AEvent));
      AEvent.stopPropagation();
      this.KeyUp({get: function () {
          return VKey;
        }, set: function (v) {
          VKey = v;
        }},rtl.refSet(VShift));
      if (VKey === 0) {
        AEvent.preventDefault();
      };
      Result = true;
      return Result;
    };
    this.HandleKeyPress = function (AEvent) {
      var Result = false;
      var VForm = null;
      var VKey = "";
      var VParent = null;
      VParent = this.FParent;
      while (VParent != null) {
        if (pas.Forms.TCustomForm.isPrototypeOf(VParent)) {
          VForm = VParent;
          if (VForm.FKeyPreview && VForm.HandleKeyPress(AEvent)) {
            Result = true;
            return Result;
          };
        };
        VParent = VParent.FParent;
      };
      AEvent.stopPropagation();
      VKey = $mod.ExtractKeyChar(AEvent);
      if (VKey === "\x00") {
        AEvent.preventDefault();
      } else {
        this.KeyPress({get: function () {
            return VKey;
          }, set: function (v) {
            VKey = v;
          }});
        if (VKey === "\x00") {
          AEvent.preventDefault();
        };
      };
      Result = true;
      return Result;
    };
    this.RegisterHandleEvents = function () {
      $mod.TControl.RegisterHandleEvents.call(this);
      var $with = this.FHandleElement;
      $with.addEventListener("focus",rtl.createSafeCallback(this,"HandleEnter"));
      $with.addEventListener("blur",rtl.createSafeCallback(this,"HandleExit"));
      $with.addEventListener("keydown",rtl.createCallback(this,"HandleKeyDown"));
      $with.addEventListener("keypress",rtl.createCallback(this,"HandleKeyPress"));
      $with.addEventListener("keyup",rtl.createCallback(this,"HandleKeyUp"));
    };
    this.UnRegisterHandleEvents = function () {
      $mod.TControl.UnRegisterHandleEvents.call(this);
      var $with = this.FHandleElement;
      $with.removeEventListener("focus",rtl.createSafeCallback(this,"HandleEnter"));
      $with.removeEventListener("blur",rtl.createSafeCallback(this,"HandleExit"));
      $with.removeEventListener("keydown",rtl.createCallback(this,"HandleKeyDown"));
      $with.removeEventListener("keypress",rtl.createCallback(this,"HandleKeyPress"));
      $with.removeEventListener("keyup",rtl.createCallback(this,"HandleKeyUp"));
    };
    this.CheckChildClassAllowed = function (AChildClass) {
      var Result = false;
      Result = (AChildClass != null) && AChildClass.InheritsFrom($mod.TControl);
      return Result;
    };
    this.FindFocusControl = function (AStartControl, ADirection) {
      var Result = null;
      var VControl = null;
      var VArray = null;
      var VIndex = 0;
      var VTabOrder = 0;
      Result = null;
      VArray = this.TabOrderArray();
      if (VArray.length === 0) {
        return Result;
      };
      try {
        VTabOrder = VArray.indexOf(AStartControl);
        if (VTabOrder < 0) {
          if (ADirection in rtl.createSet($mod.TFocusSearchDirection.fsdFirst)) {
            VTabOrder = VArray.length - 1;
          } else {
            VTabOrder = 0;
          };
        };
        var $tmp = ADirection;
        if ($tmp === $mod.TFocusSearchDirection.fsdFirst) {
          VControl = rtl.getObject(VArray[0]);
          if ((VControl != null) && $mod.TWinControl.isPrototypeOf(VControl) && VControl.FEnabled && VControl.FVisible && VControl.FTabStop) {
            return VControl;
          };
        } else if ($tmp === $mod.TFocusSearchDirection.fsdLast) {
          VControl = rtl.getObject(VArray[VArray.length - 1]);
          if ((VControl != null) && $mod.TWinControl.isPrototypeOf(VControl) && VControl.FEnabled && VControl.FVisible && VControl.FTabStop) {
            return VControl;
          };
        } else if ($tmp === $mod.TFocusSearchDirection.fsdNext) {
          if (VTabOrder < (VArray.length - 1)) {
            for (var $l = VTabOrder + 1, $end = VArray.length - 1; $l <= $end; $l++) {
              VIndex = $l;
              VControl = rtl.getObject(VArray[VIndex]);
              if ((VControl != null) && $mod.TWinControl.isPrototypeOf(VControl) && VControl.FEnabled && VControl.FVisible && VControl.FTabStop) {
                return VControl;
              };
            };
          };
        } else if ($tmp === $mod.TFocusSearchDirection.fsdPrev) {
          if (VTabOrder > 0) {
            for (var $l1 = VTabOrder - 1; $l1 >= 0; $l1--) {
              VIndex = $l1;
              VControl = rtl.getObject(VArray[VIndex]);
              if ((VControl != null) && $mod.TWinControl.isPrototypeOf(VControl) && VControl.FEnabled && VControl.FVisible && VControl.FTabStop) {
                return VControl;
              };
            };
          };
        };
      } finally {
        VArray.length = 0;
      };
      return Result;
    };
    this.CanSetFocus = function () {
      var Result = false;
      var VControl = null;
      VControl = this;
      while (true) {
        if (!VControl.FVisible && VControl.FEnabled) {
          Result = false;
          return Result;
        };
        if (VControl.FParent != null) {
          VControl = VControl.FParent;
        } else {
          break;
        };
      };
      Result = (VControl != null) && pas.Forms.TCustomForm.isPrototypeOf(VControl);
      return Result;
    };
    this.SetFocus = function () {
      this.FHandleElement.focus();
    };
  });
  rtl.createClass(this,"TCustomControl",this.TWinControl,function () {
    this.$init = function () {
      $mod.TWinControl.$init.call(this);
      this.FCanvas = null;
      this.FOnPaint = null;
    };
    this.$final = function () {
      this.FCanvas = undefined;
      this.FOnPaint = undefined;
      $mod.TWinControl.$final.call(this);
    };
    this.GetCanvas = function () {
      var Result = null;
      if (!(this.FCanvas != null)) {
        this.FCanvas = $mod.TControlCanvas.$create("Create$2",[this]);
      };
      Result = this.FCanvas;
      return Result;
    };
    this.ColorChanged = function (Sender) {
      if (this.FCanvas != null) {
        this.FCanvas.FBrush.SetColor(this.FColor);
      };
      $mod.TControl.ColorChanged.call(this,Sender);
    };
    this.FontChanged = function (Sender) {
      if (this.FCanvas != null) {
        this.FCanvas.FFont.Assign(this.FFont);
      };
      $mod.TControl.FontChanged.call(this,Sender);
    };
    this.Paint = function () {
      if (this.FOnPaint != null) {
        this.FOnPaint(this);
      };
    };
    this.Destroy = function () {
      if (this.FCanvas != null) {
        this.FCanvas.$destroy("Destroy");
        this.FCanvas = null;
      };
      $mod.TControl.Destroy.call(this);
    };
    this.Invalidate = function () {
      $mod.TControl.Invalidate.call(this);
      this.Paint();
    };
  });
  this.IfThen$3 = function (AExpression, AConsequence, AAlternative) {
    var Result = "";
    if (AExpression) {
      Result = AConsequence;
    } else {
      Result = AAlternative;
    };
    return Result;
  };
  this.OffSets = function (AElement) {
    var Result = pas.Types.TRect.$new();
    Result.$assign(pas.Types.Rect(0,0,0,0));
    if (AElement != null) {
      var $with = AElement.getBoundingClientRect();
      Result.Left = pas.System.Trunc($with.left + window.scrollX);
      Result.Top = pas.System.Trunc($with.top + window.screenY);
    };
    return Result;
  };
  this.ExtractKeyCode = function (AEvent) {
    var Result = 0;
    var VLocation = 0;
    var VKey = "";
    VLocation = AEvent.location;
    VKey = pas.SysUtils.LowerCase(AEvent.key);
    Result = -1;
    var $tmp = VKey;
    if ($tmp === "backspace") {
      Result = 8}
     else if ($tmp === "tab") {
      Result = 9}
     else if ($tmp === "enter") {
      Result = 13}
     else if ($tmp === "shift") {
      Result = 16}
     else if ($tmp === "control") {
      Result = 17}
     else if ($tmp === "alt") {
      Result = 18}
     else if ($tmp === "altgraph") {
      Result = 18}
     else if ($tmp === "pause") {
      Result = 19}
     else if ($tmp === "capslock") {
      Result = 20}
     else if ($tmp === "escape") {
      Result = 27}
     else if ($tmp === "pageup") {
      Result = 33}
     else if ($tmp === "pagedown") {
      Result = 34}
     else if ($tmp === "end") {
      Result = 35}
     else if ($tmp === "home") {
      Result = 36}
     else if ($tmp === "arrowleft") {
      Result = 37}
     else if ($tmp === "arrowup") {
      Result = 38}
     else if ($tmp === "arrowright") {
      Result = 39}
     else if ($tmp === "arrowdown") {
      Result = 40}
     else if ($tmp === "insert") {
      Result = 45}
     else if ($tmp === "delete") {
      Result = 46}
     else if ($tmp === "f1") {
      Result = 112}
     else if ($tmp === "f2") {
      Result = 113}
     else if ($tmp === "f3") {
      Result = 114}
     else if ($tmp === "f4") {
      Result = 115}
     else if ($tmp === "f5") {
      Result = 116}
     else if ($tmp === "f6") {
      Result = 117}
     else if ($tmp === "f7") {
      Result = 118}
     else if ($tmp === "f8") {
      Result = 119}
     else if ($tmp === "f9") {
      Result = 120}
     else if ($tmp === "f10") {
      Result = 121}
     else if ($tmp === "f11") {
      Result = 122}
     else if ($tmp === "f12") {
      Result = 123}
     else if ($tmp === "f13") {
      Result = 124}
     else if ($tmp === "f14") {
      Result = 125}
     else if ($tmp === "f15") {
      Result = 126}
     else if ($tmp === "f16") {
      Result = 127}
     else if ($tmp === "f17") {
      Result = 128}
     else if ($tmp === "f18") {
      Result = 129}
     else if ($tmp === "f19") {
      Result = 130}
     else if ($tmp === "f20") {
      Result = 131}
     else if ($tmp === "numlock") {
      Result = 144}
     else if ($tmp === "scrolllock") Result = 145;
    if (VLocation === 3) {
      var $tmp1 = VKey;
      if ($tmp1 === "0") {
        Result = 96}
       else if ($tmp1 === "1") {
        Result = 97}
       else if ($tmp1 === "2") {
        Result = 98}
       else if ($tmp1 === "3") {
        Result = 99}
       else if ($tmp1 === "4") {
        Result = 100}
       else if ($tmp1 === "5") {
        Result = 101}
       else if ($tmp1 === "6") {
        Result = 102}
       else if ($tmp1 === "7") {
        Result = 103}
       else if ($tmp1 === "8") {
        Result = 104}
       else if ($tmp1 === "9") {
        Result = 105}
       else if ($tmp1 === "*") {
        Result = 106}
       else if ($tmp1 === "+") {
        Result = 107}
       else if ($tmp1 === "-") {
        Result = 109}
       else if ($tmp1 === ",") {
        Result = 110}
       else if ($tmp1 === "\/") {
        Result = 111}
       else if ($tmp1 === ".") Result = 194;
    } else {
      var $tmp2 = VKey;
      if ($tmp2 === "0") {
        Result = 48}
       else if ($tmp2 === "1") {
        Result = 49}
       else if ($tmp2 === "2") {
        Result = 50}
       else if ($tmp2 === "3") {
        Result = 51}
       else if ($tmp2 === "4") {
        Result = 52}
       else if ($tmp2 === "5") {
        Result = 53}
       else if ($tmp2 === "6") {
        Result = 54}
       else if ($tmp2 === "7") {
        Result = 55}
       else if ($tmp2 === "8") {
        Result = 56}
       else if ($tmp2 === "9") {
        Result = 57}
       else if ($tmp2 === "ç") {
        Result = 63}
       else if ($tmp2 === "a") {
        Result = 65}
       else if ($tmp2 === "b") {
        Result = 66}
       else if ($tmp2 === "c") {
        Result = 67}
       else if ($tmp2 === "d") {
        Result = 68}
       else if ($tmp2 === "e") {
        Result = 69}
       else if ($tmp2 === "f") {
        Result = 70}
       else if ($tmp2 === "g") {
        Result = 71}
       else if ($tmp2 === "h") {
        Result = 72}
       else if ($tmp2 === "i") {
        Result = 73}
       else if ($tmp2 === "j") {
        Result = 74}
       else if ($tmp2 === "k") {
        Result = 75}
       else if ($tmp2 === "l") {
        Result = 76}
       else if ($tmp2 === "m") {
        Result = 77}
       else if ($tmp2 === "n") {
        Result = 78}
       else if ($tmp2 === "o") {
        Result = 79}
       else if ($tmp2 === "p") {
        Result = 80}
       else if ($tmp2 === "q") {
        Result = 81}
       else if ($tmp2 === "r") {
        Result = 82}
       else if ($tmp2 === "s") {
        Result = 83}
       else if ($tmp2 === "t") {
        Result = 84}
       else if ($tmp2 === "u") {
        Result = 85}
       else if ($tmp2 === "v") {
        Result = 86}
       else if ($tmp2 === "w") {
        Result = 87}
       else if ($tmp2 === "x") {
        Result = 88}
       else if ($tmp2 === "y") {
        Result = 89}
       else if ($tmp2 === "z") {
        Result = 90}
       else if ($tmp2 === "=") {
        Result = 187}
       else if ($tmp2 === ",") {
        Result = 188}
       else if ($tmp2 === "-") {
        Result = 189}
       else if ($tmp2 === ".") {
        Result = 190}
       else if ($tmp2 === "'") {
        Result = 192}
       else if ($tmp2 === "\/") {
        Result = 193}
       else if ($tmp2 === "]") {
        Result = 220}
       else if ($tmp2 === "[") Result = 221;
    };
    return Result;
  };
  this.ExtractKeyChar = function (AEvent) {
    var Result = "";
    var VKey = "";
    VKey = pas.SysUtils.LowerCase(AEvent.key);
    Result = "\x00";
    if (VKey.length === 1) {
      Result = VKey.charAt(0);
    } else {
      var $tmp = VKey;
      if ($tmp === "backspace") {
        Result = "\b"}
       else if ($tmp === "tab") {
        Result = "\t"}
       else if ($tmp === "enter") {
        Result = "\r"}
       else if ($tmp === "escape") Result = "\x1B";
    };
    return Result;
  };
  this.ExtractShiftState = function (AEvent) {
    var Result = {};
    Result = {};
    if (AEvent.altKey) {
      Result = rtl.unionSet(Result,rtl.createSet($mod.TShiftStateEnum.ssAlt));
    };
    if (AEvent.ctrlKey) {
      Result = rtl.unionSet(Result,rtl.createSet($mod.TShiftStateEnum.ssCtrl));
    };
    if (AEvent.shiftKey) {
      Result = rtl.unionSet(Result,rtl.createSet($mod.TShiftStateEnum.ssShift));
    };
    return Result;
  };
  this.ExtractShiftState$1 = function (AEvent) {
    var Result = {};
    Result = {};
    if (AEvent.altKey) {
      Result = rtl.unionSet(Result,rtl.createSet($mod.TShiftStateEnum.ssAlt));
    };
    if (AEvent.ctrlKey) {
      Result = rtl.unionSet(Result,rtl.createSet($mod.TShiftStateEnum.ssCtrl));
    };
    if (AEvent.shiftKey) {
      Result = rtl.unionSet(Result,rtl.createSet($mod.TShiftStateEnum.ssShift));
    };
    return Result;
  };
  this.ExtractMouseButton = function (AEvent) {
    var Result = 0;
    var $tmp = AEvent.button;
    if ($tmp === 1) {
      Result = $mod.TMouseButton.mbMiddle}
     else if ($tmp === 2) {
      Result = $mod.TMouseButton.mbRight}
     else {
      Result = $mod.TMouseButton.mbMiddle;
    };
    return Result;
  };
  this.JSCursor = function (ACursor) {
    var Result = "";
    var $tmp = ACursor;
    if ($tmp === -1) {
      Result = "none"}
     else if ($tmp === -3) {
      Result = "crosshair"}
     else if ($tmp === -4) {
      Result = "text"}
     else if ($tmp === -22) {
      Result = "move"}
     else if ($tmp === -6) {
      Result = "nesw-resize"}
     else if ($tmp === -7) {
      Result = "ns-resize"}
     else if ($tmp === -8) {
      Result = "nwse-resize"}
     else if ($tmp === -9) {
      Result = "ew-resize"}
     else if ($tmp === -23) {
      Result = "nwse-resize"}
     else if ($tmp === -24) {
      Result = "ns-resize"}
     else if ($tmp === -25) {
      Result = "nesw-resize"}
     else if ($tmp === -26) {
      Result = "col-resize"}
     else if ($tmp === -27) {
      Result = "col-resize"}
     else if ($tmp === -28) {
      Result = "nesw-resize"}
     else if ($tmp === -29) {
      Result = "ns-resize"}
     else if ($tmp === -30) {
      Result = "nwse-resize"}
     else if ($tmp === -11) {
      Result = "wait"}
     else if ($tmp === -13) {
      Result = "no-drop"}
     else if ($tmp === -14) {
      Result = "col-resize"}
     else if ($tmp === -15) {
      Result = "row-resize"}
     else if ($tmp === -17) {
      Result = "progress"}
     else if ($tmp === -18) {
      Result = "not-allowed"}
     else if ($tmp === -19) {
      Result = "wait"}
     else if ($tmp === -20) {
      Result = "help"}
     else if ($tmp === -21) {
      Result = "pointer"}
     else {
      Result = "";
    };
    return Result;
  };
},["Forms"]);
rtl.module("WebExtra",["System","SysUtils","Web"],function () {
  "use strict";
  var $mod = this;
});
rtl.module("StdCtrls",["System","Classes","SysUtils","Types","Web","WebExtra","Graphics","Controls","Forms"],function () {
  "use strict";
  var $mod = this;
  var $impl = $mod.$impl;
  this.TEditCharCase = {"0": "ecNormal", ecNormal: 0, "1": "ecUppercase", ecUppercase: 1, "2": "ecLowerCase", ecLowerCase: 2};
  this.$rtti.$Enum("TEditCharCase",{minvalue: 0, maxvalue: 2, ordtype: 1, enumtype: this.TEditCharCase});
  this.TComboBoxStyle = {"0": "csDropDown", csDropDown: 0, "1": "csSimple", csSimple: 1, "2": "csDropDownList", csDropDownList: 2, "3": "csOwnerDrawFixed", csOwnerDrawFixed: 3, "4": "csOwnerDrawVariable", csOwnerDrawVariable: 4};
  rtl.createClass(this,"TCustomComboBox",pas.Controls.TWinControl,function () {
    this.$init = function () {
      pas.Controls.TWinControl.$init.call(this);
      this.fStyle = 0;
      this.FDropDownCount = 0;
      this.FItemHeight = 0;
      this.FItemIndex = 0;
      this.FItems = null;
      this.FOnChange = null;
      this.FSorted = false;
      this.EditElement = null;
      this.SelectElement = null;
    };
    this.$final = function () {
      this.FItems = undefined;
      this.FOnChange = undefined;
      this.EditElement = undefined;
      this.SelectElement = undefined;
      pas.Controls.TWinControl.$final.call(this);
    };
    this.SetItemHeight = function (AValue) {
      if (this.FItemHeight !== AValue) {
        this.FItemHeight = AValue;
        this.Change();
      };
    };
    this.SetItemIndex = function (AValue) {
      if ((AValue > -1) && (AValue < this.FItems.GetCount())) {
        this.FItemIndex = AValue;
        this.Changed();
      };
    };
    this.SetItems = function (AValue) {
      this.FItems.Assign(AValue);
      this.Changed();
    };
    this.ItemsChange = function (ASender) {
      this.Changed();
    };
    this.Change = function () {
      if (this.FOnChange != null) {
        this.FOnChange(this);
      };
    };
    this.HandleChange = function (AEvent) {
      var Result = false;
      AEvent.stopPropagation();
      this.FItemIndex = this.FHandleElement.selectedIndex;
      this.Change();
      Result = true;
      return Result;
    };
    this.Changed = function () {
      var VIndex = 0;
      var VOptionElement = null;
      var VValue = "";
      pas.Controls.TControl.Changed.call(this);
      if (!this.IsUpdating() && !(pas.Classes.TComponentStateItem.csLoading in this.FComponentState)) {
        for (var $l = this.SelectElement.length - 1; $l >= 0; $l--) {
          VIndex = $l;
          this.SelectElement.remove(VIndex);
        };
        if (this.fStyle === $mod.TComboBoxStyle.csSimple) {
          this.SelectElement.size = 2;
          if (this.EditElement === null) {
            this.EditElement = document.createElement("input");
            this.EditElement.style.setProperty("width",pas.SysUtils.IntToStr(pas.SysUtils.StrToIntDef(pas.SysUtils.StringReplace(this.FHandleElement.style.getPropertyValue("width"),"px","",{}),0) - 8) + "px");
            this.SelectElement.style.setProperty("height",pas.SysUtils.IntToStr(pas.SysUtils.StrToIntDef(pas.SysUtils.StringReplace(this.FHandleElement.style.getPropertyValue("height"),"px","",{}),0) - 22) + "px");
            this.FHandleElement.removeChild(this.SelectElement);
            this.FHandleElement.appendChild(this.EditElement);
            this.FHandleElement.appendChild(this.SelectElement);
          };
        };
        for (var $l1 = 0, $end = this.FItems.GetCount() - 1; $l1 <= $end; $l1++) {
          VIndex = $l1;
          VValue = this.FItems.Get(VIndex);
          VOptionElement = document.createElement("option");
          VOptionElement.value = VValue;
          VOptionElement.text = VValue;
          VOptionElement.selected = VIndex === this.FItemIndex;
          this.SelectElement.add(VOptionElement);
        };
        if (this.FItemIndex < 0) {
          VOptionElement = document.createElement("option");
          VOptionElement.value = "";
          VOptionElement.text = "";
          VOptionElement.selected = true;
          VOptionElement.disabled = true;
          VOptionElement.style.setProperty("display","none");
          this.SelectElement.add(VOptionElement);
        };
        this.SelectElement.style.setProperty("width","100%");
        this.SelectElement.style.setProperty("overflow","hidden");
      };
    };
    this.CreateHandleElement = function () {
      var Result = null;
      Result = document.createElement("div");
      this.SelectElement = document.createElement("select");
      Result.appendChild(this.SelectElement);
      return Result;
    };
    this.RegisterHandleEvents = function () {
      pas.Controls.TWinControl.RegisterHandleEvents.call(this);
      var $with = this.FHandleElement;
      $with.addEventListener("change",rtl.createSafeCallback(this,"HandleChange"));
    };
    this.UnRegisterHandleEvents = function () {
      pas.Controls.TWinControl.UnRegisterHandleEvents.call(this);
      var $with = this.FHandleElement;
      $with.removeEventListener("change",rtl.createSafeCallback(this,"HandleChange"));
    };
    this.CheckChildClassAllowed = function (AChildClass) {
      var Result = false;
      Result = false;
      return Result;
    };
    this.RealGetText = function () {
      var Result = "";
      Result = this.FItems.Get(this.FItemIndex);
      return Result;
    };
    this.RealSetText = function (AValue) {
      var VIndex = 0;
      VIndex = this.FItems.IndexOf(AValue);
      if ((VIndex > -1) && (VIndex < this.FItems.GetCount())) {
        this.FItemIndex = VIndex;
        this.Changed();
      };
    };
    this.GetControlClassDefaultSize = function () {
      var Result = pas.Types.TSize.$new();
      Result.cx = 100;
      Result.cy = 25;
      return Result;
    };
    this.Create$1 = function (AOwner) {
      pas.Controls.TControl.Create$1.call(this,AOwner);
      this.FDropDownCount = 8;
      this.FItemHeight = 0;
      this.FItemIndex = -1;
      this.FItems = pas.Classes.TStringList.$create("Create$1");
      this.FItems.FOnChange = rtl.createCallback(this,"ItemsChange");
      this.FSorted = false;
      this.BeginUpdate();
      try {
        var $with = this.$class.GetControlClassDefaultSize();
        this.SetBounds(0,0,$with.cx,$with.cy);
      } finally {
        this.EndUpdate();
      };
      return this;
    };
    this.Destroy = function () {
      this.FItems.$destroy("Destroy");
      this.FItems = null;
      pas.Controls.TControl.Destroy.call(this);
    };
  });
  this.$rtti.$MethodVar("TSelectionChangeEvent",{procsig: rtl.newTIProcSig([["Sender",pas.System.$rtti["TObject"]],["User",rtl.boolean]]), methodkind: 0});
  rtl.createClass(this,"TCustomListBox",pas.Controls.TWinControl,function () {
    this.$init = function () {
      pas.Controls.TWinControl.$init.call(this);
      this.FItemHeight = 0;
      this.FItemIndex = 0;
      this.FItems = null;
      this.FMultiSelect = false;
      this.FSelectionChanged = false;
      this.FSelected = [];
      this.FSorted = false;
      this.FOnSelectionChange = null;
    };
    this.$final = function () {
      this.FItems = undefined;
      this.FSelected = undefined;
      this.FOnSelectionChange = undefined;
      pas.Controls.TWinControl.$final.call(this);
    };
    this.SetItemHeight = function (AValue) {
      if (this.FItemHeight !== AValue) {
        this.FItemHeight = AValue;
        this.Changed();
      };
    };
    this.SetItemIndex = function (AValue) {
      if ((AValue > -1) && (AValue < this.FItems.GetCount())) {
        this.BeginUpdate();
        try {
          if (this.FMultiSelect) this.ClearSelection();
          this.FItemIndex = AValue;
          this.Changed();
        } finally {
          this.EndUpdate();
        };
      };
    };
    this.SetItems = function (AValue) {
      this.FItems.Assign(AValue);
      this.Changed();
    };
    this.SetMultiSelect = function (AValue) {
      if (this.FMultiSelect !== AValue) {
        this.ClearSelection();
        this.FMultiSelect = AValue;
        if (!(pas.Classes.TComponentStateItem.csLoading in this.FComponentState)) this.FSelectionChanged = true;
        this.Changed();
      };
    };
    this.SetSelected = function (Index, AValue) {
      var i = 0;
      if (Index > (rtl.length(this.FSelected) - 1)) throw pas.Classes.EListError.$create("CreateFmt",[rtl.getResStr(pas.RTLConsts,"SListIndexError"),pas.System.VarRecs(0,Index)]);
      if (AValue && !this.FMultiSelect) {
        for (var $l = 0, $end = rtl.length(this.FSelected) - 1; $l <= $end; $l++) {
          i = $l;
          if (this.FSelected[i]) this.FSelected[i] = false;
        };
      };
      this.FSelected[Index] = AValue;
      if (AValue) {
        this.FItemIndex = Index}
       else {
        this.FItemIndex = -1;
        if (this.FMultiSelect) {
          for (var $l1 = 0, $end1 = rtl.length(this.FSelected) - 1; $l1 <= $end1; $l1++) {
            i = $l1;
            if (this.FSelected[i]) {
              this.FItemIndex = i;
              break;
            };
          };
        };
      };
      if (!(pas.Classes.TComponentStateItem.csLoading in this.FComponentState)) this.FSelectionChanged = true;
      this.Changed();
    };
    this.ItemsChanged = function (ASender) {
      if (rtl.length(this.FSelected) !== this.FItems.GetCount()) this.FSelected = rtl.arraySetLength(this.FSelected,false,this.FItems.GetCount());
      this.Changed();
    };
    this.SelectionChange = function (AUser) {
      if (this.FOnSelectionChange != null) this.FOnSelectionChange(this,AUser);
    };
    this.HandleChange = function (AEvent) {
      var Result = false;
      var i = 0;
      AEvent.stopPropagation();
      var $with = this.FHandleElement;
      this.FItemIndex = $with.selectedIndex;
      for (var $l = 0, $end = $with.length - 1; $l <= $end; $l++) {
        i = $l;
        this.FSelected[i] = $with.item(i).selected;
      };
      this.SelectionChange(true);
      Result = true;
      return Result;
    };
    this.Changed = function () {
      var idx = 0;
      var v = "";
      var opt = null;
      pas.Controls.TControl.Changed.call(this);
      if (!this.IsUpdating() && !(pas.Classes.TComponentStateItem.csLoading in this.FComponentState)) {
        if (this.FSelectionChanged) {
          this.SelectionChange(false);
          this.FSelectionChanged = false;
        };
        var $with = this.FHandleElement;
        $with.style.setProperty("overflow-y","scroll");
        $with.multiple = this.FMultiSelect;
        $with.size = 2;
        for (var $l = this.FHandleElement.length - 1; $l >= 0; $l--) {
          idx = $l;
          $with.remove(idx);
        };
        for (var $l1 = 0, $end = this.FItems.GetCount() - 1; $l1 <= $end; $l1++) {
          idx = $l1;
          v = this.FItems.Get(idx);
          opt = document.createElement("option");
          opt.value = v;
          opt.text = v;
          if (this.FMultiSelect) {
            opt.selected = this.FSelected[idx]}
           else opt.selected = idx === this.FItemIndex;
          $with.add(opt);
        };
      };
    };
    this.CreateHandleElement = function () {
      var Result = null;
      Result = document.createElement("select");
      return Result;
    };
    this.RegisterHandleEvents = function () {
      pas.Controls.TWinControl.RegisterHandleEvents.call(this);
      var $with = this.FHandleElement;
      $with.addEventListener("change",rtl.createSafeCallback(this,"HandleChange"));
    };
    this.UnRegisterHandleEvents = function () {
      pas.Controls.TWinControl.UnRegisterHandleEvents.call(this);
      var $with = this.FHandleElement;
      $with.removeEventListener("change",rtl.createSafeCallback(this,"HandleChange"));
    };
    this.CheckChildClassAllowed = function (AChildClass) {
      var Result = false;
      Result = false;
      return Result;
    };
    this.GetControlClassDefaultSize = function () {
      var Result = pas.Types.TSize.$new();
      Result.cx = 100;
      Result.cy = 70;
      return Result;
    };
    this.Create$1 = function (AOwner) {
      pas.Controls.TControl.Create$1.call(this,AOwner);
      this.FItemHeight = 0;
      this.FItemIndex = -1;
      this.FItems = pas.Classes.TStringList.$create("Create$1");
      this.FItems.FOnChange = rtl.createCallback(this,"ItemsChanged");
      this.FMultiSelect = false;
      this.FSorted = false;
      this.BeginUpdate();
      try {
        var $with = this.$class.GetControlClassDefaultSize();
        this.SetBounds(0,0,$with.cx,$with.cy);
      } finally {
        this.EndUpdate();
      };
      return this;
    };
    this.Destroy = function () {
      rtl.free(this,"FItems");
      pas.Controls.TControl.Destroy.call(this);
    };
    this.Clear = function () {
      this.FItems.Clear();
      this.FItemIndex = -1;
      this.FSelected = [];
      this.Changed();
    };
    this.ClearSelection = function () {
      var i = 0;
      if (this.FMultiSelect) {
        this.BeginUpdate();
        try {
          for (var $l = 0, $end = this.FItems.GetCount() - 1; $l <= $end; $l++) {
            i = $l;
            this.SetSelected(i,false);
          };
        } finally {
          this.EndUpdate();
        };
      } else this.SetItemIndex(-1);
    };
  });
  rtl.createClass(this,"TCustomEdit",pas.Controls.TWinControl,function () {
    this.$init = function () {
      pas.Controls.TWinControl.$init.call(this);
      this.FAlignment = 0;
      this.FCharCase = 0;
      this.FMaxLength = 0;
      this.FModified = false;
      this.FPasswordChar = "";
      this.FPattern = "";
      this.FReadOnly = false;
      this.FRequired = false;
      this.FSelLength = 0;
      this.FSelStart = 0;
      this.FText = "";
      this.FTextHint = "";
      this.FOnChange = null;
    };
    this.$final = function () {
      this.FOnChange = undefined;
      pas.Controls.TWinControl.$final.call(this);
    };
    this.SetAlignment = function (AValue) {
      if (this.FAlignment !== AValue) {
        this.FAlignment = AValue;
        this.Changed();
      };
    };
    this.SetCharCase = function (AValue) {
      if (this.FCharCase !== AValue) {
        this.FCharCase = AValue;
        this.Changed();
      };
    };
    this.SetMaxLength = function (AValue) {
      if (this.FMaxLength !== AValue) {
        this.FMaxLength = AValue;
        this.Changed();
      };
    };
    this.SetPasswordChar = function (AValue) {
      if (this.FPasswordChar !== AValue) {
        this.FPasswordChar = AValue;
        this.Changed();
      };
    };
    this.SetReadOnly = function (AValue) {
      if (this.FReadOnly !== AValue) {
        this.FReadOnly = AValue;
        this.Changed();
      };
    };
    this.SetSelLength = function (AValue) {
      if (AValue < 0) {
        AValue = 0;
      };
      if (this.FSelLength !== AValue) {
        this.FSelLength = AValue;
        this.Changed();
      };
    };
    this.SetSelStart = function (AValue) {
      if (this.FSelStart !== AValue) {
        this.FSelStart = AValue;
        this.Changed();
      };
    };
    this.SetTextHint = function (AValue) {
      if (this.FTextHint !== AValue) {
        this.FTextHint = AValue;
        this.Changed();
      };
    };
    this.Change = function () {
      if (this.FOnChange != null) {
        this.FOnChange(this);
      };
    };
    this.DoEnter = function () {
      pas.Controls.TWinControl.DoEnter.call(this);
      this.SelectAll();
    };
    this.DoInput = function (ANewValue) {
      if (ANewValue !== this.RealGetText()) {
        this.FText = ANewValue;
        this.FModified = true;
        this.Change();
      };
    };
    this.HandleInput = function (AEvent) {
      var Result = false;
      AEvent.stopPropagation();
      this.DoInput(this.FHandleElement.value);
      Result = true;
      return Result;
    };
    this.Changed = function () {
      pas.Controls.TControl.Changed.call(this);
      if (!this.IsUpdating() && !(pas.Classes.TComponentStateItem.csLoading in this.FComponentState)) {
        var $with = this.FHandleElement;
        var $tmp = this.FAlignment;
        if ($tmp === pas.Classes.TAlignment.taRightJustify) {
          $with.style.setProperty("text-align","right")}
         else if ($tmp === pas.Classes.TAlignment.taCenter) {
          $with.style.setProperty("text-align","center")}
         else {
          $with.style.removeProperty("text-align");
        };
        var $tmp1 = this.FCharCase;
        if ($tmp1 === $mod.TEditCharCase.ecLowerCase) {
          $with.style.setProperty("text-transform","lowercase")}
         else if ($tmp1 === $mod.TEditCharCase.ecUppercase) {
          $with.style.setProperty("text-transform","uppercase")}
         else {
          $with.style.removeProperty("text-transform");
        };
        if (this.FMaxLength > 0) {
          $with.maxLength = this.FMaxLength;
        } else {
          $with.removeAttribute("maxlength");
        };
        if (this.FPattern !== "") {
          $with.pattern = this.FPattern;
        } else {
          $with.removeAttribute("pattern");
        };
        if (this.FTextHint !== "") {
          $with.placeholder = this.FTextHint;
        } else {
          $with.removeAttribute("placeholder");
        };
        $with.readOnly = this.FReadOnly;
        $with.required = this.FRequired;
        var $tmp2 = this.InputType();
        if (($tmp2 === "text") || ($tmp2 === "search") || ($tmp2 === "URL") || ($tmp2 === "tel") || ($tmp2 === "password")) {
          $with.setSelectionRange(this.FSelStart,this.FSelStart + this.FSelLength);
        };
        $with.type = this.InputType();
        $with.value = this.RealGetText();
      };
    };
    this.CreateHandleElement = function () {
      var Result = null;
      Result = document.createElement("input");
      return Result;
    };
    this.RegisterHandleEvents = function () {
      pas.Controls.TWinControl.RegisterHandleEvents.call(this);
      var $with = this.FHandleElement;
      $with.addEventListener("input",rtl.createSafeCallback(this,"HandleInput"));
    };
    this.UnRegisterHandleEvents = function () {
      pas.Controls.TWinControl.UnRegisterHandleEvents.call(this);
      var $with = this.FHandleElement;
      $with.removeEventListener("input",rtl.createSafeCallback(this,"HandleInput"));
    };
    this.CheckChildClassAllowed = function (AChildClass) {
      var Result = false;
      Result = pas.Controls.TWinControl.CheckChildClassAllowed.call(this,AChildClass);
      return Result;
    };
    this.RealGetText = function () {
      var Result = "";
      Result = this.FText;
      return Result;
    };
    this.RealSetText = function (AValue) {
      this.FText = AValue;
      this.FModified = false;
      this.Changed();
    };
    this.InputType = function () {
      var Result = "";
      Result = pas.Controls.IfThen$3(this.FPasswordChar !== "\x00","password","text");
      return Result;
    };
    this.GetControlClassDefaultSize = function () {
      var Result = pas.Types.TSize.$new();
      Result.cx = 80;
      Result.cy = 25;
      return Result;
    };
    this.Create$1 = function (AOwner) {
      pas.Controls.TControl.Create$1.call(this,AOwner);
      this.FMaxLength = 0;
      this.FModified = false;
      this.FPasswordChar = "\x00";
      this.FPattern = "";
      this.FReadOnly = false;
      this.FTextHint = "";
      this.FText = "";
      this.BeginUpdate();
      try {
        var $with = this.$class.GetControlClassDefaultSize();
        this.SetBounds(0,0,$with.cx,$with.cy);
      } finally {
        this.EndUpdate();
      };
      return this;
    };
    this.SelectAll = function () {
      if (this.RealGetText() !== "") {
        this.BeginUpdate();
        try {
          this.SetSelStart(0);
          this.SetSelLength(this.RealGetText().length);
        } finally {
          this.EndUpdate();
        };
      };
    };
  });
  rtl.createClass(this,"TCustomMemo",pas.Controls.TWinControl,function () {
    this.$init = function () {
      pas.Controls.TWinControl.$init.call(this);
      this.FAlignment = 0;
      this.FCharCase = 0;
      this.FLines = null;
      this.FMaxLength = 0;
      this.FModified = false;
      this.FReadOnly = false;
      this.FTextHint = "";
      this.FWantReturns = false;
      this.FWantTabs = false;
      this.FWordWrap = false;
      this.FOnChange = null;
    };
    this.$final = function () {
      this.FLines = undefined;
      this.FOnChange = undefined;
      pas.Controls.TWinControl.$final.call(this);
    };
    this.SetAlignment = function (AValue) {
      if (this.FAlignment !== AValue) {
        this.FAlignment = AValue;
        this.Changed();
      };
    };
    this.SetCharCase = function (AValue) {
      if (this.FCharCase !== AValue) {
        this.FCharCase = AValue;
        this.Changed();
      };
    };
    this.SetLines = function (AValue) {
      this.FLines.Assign(AValue);
      this.Changed();
    };
    this.SetMaxLength = function (AValue) {
      if (this.FMaxLength !== AValue) {
        this.FMaxLength = AValue;
        this.Changed();
      };
    };
    this.SetReadOnly = function (AValue) {
      if (this.FReadOnly !== AValue) {
        this.FReadOnly = AValue;
        this.Changed();
      };
    };
    this.SetTextHint = function (AValue) {
      if (this.FTextHint !== AValue) {
        this.FTextHint = AValue;
      };
    };
    this.SetWantReturns = function (AValue) {
      if (this.FWantReturns !== AValue) {
        this.FWantReturns = AValue;
      };
    };
    this.SetWantTabs = function (AValue) {
      if (this.FWantTabs !== AValue) {
        this.FWantTabs = AValue;
      };
    };
    this.SetWordWrap = function (AValue) {
      if (this.FWordWrap !== AValue) {
        this.FWordWrap = AValue;
        this.Changed();
      };
    };
    this.Change = function () {
      if (this.FOnChange != null) {
        this.FOnChange(this);
      };
    };
    this.KeyDown = function (Key, Shift) {
      pas.Controls.TWinControl.KeyDown.call(this,Key,rtl.refSet(Shift));
      if (!this.FWantReturns && (Key.get() === 13)) {
        Key.set(0);
      };
    };
    this.HandleChange = function (AEvent) {
      var Result = false;
      var VNewText = "";
      var VOldText = "";
      AEvent.stopPropagation();
      VNewText = this.FHandleElement.value;
      VOldText = this.RealGetText();
      if (VNewText !== VOldText) {
        this.FLines.SetTextStr(VNewText);
        this.FModified = true;
        this.Change();
      };
      Result = true;
      return Result;
    };
    this.Changed = function () {
      pas.Controls.TControl.Changed.call(this);
      if (!this.IsUpdating() && !(pas.Classes.TComponentStateItem.csLoading in this.FComponentState)) {
        var $with = this.FHandleElement;
        var $tmp = this.FAlignment;
        if ($tmp === pas.Classes.TAlignment.taRightJustify) {
          $with.style.setProperty("text-align","right")}
         else if ($tmp === pas.Classes.TAlignment.taCenter) {
          $with.style.setProperty("text-align","center")}
         else {
          $with.style.removeProperty("text-align");
        };
        var $tmp1 = this.FCharCase;
        if ($tmp1 === $mod.TEditCharCase.ecLowerCase) {
          $with.style.setProperty("text-transform","lowercase")}
         else if ($tmp1 === $mod.TEditCharCase.ecUppercase) {
          $with.style.setProperty("text-transform","uppercase")}
         else {
          $with.style.removeProperty("text-transform");
        };
        if (this.FMaxLength > 0) {
          $with.maxLength = this.FMaxLength;
        } else {
          $with.removeAttribute("maxlength");
        };
        if (this.FTextHint !== "") {
          $with.placeholder = this.FTextHint;
        } else {
          $with.removeAttribute("placeholder");
        };
        $with.readOnly = this.FReadOnly;
        $with.style.setProperty("resize","none");
        if (this.FWordWrap) {
          $with.removeAttribute("wrap");
        } else {
          $with.wrap = "off";
        };
        $with.style.setProperty("overflow","auto");
        $with.value = this.RealGetText();
      };
    };
    this.CreateHandleElement = function () {
      var Result = null;
      Result = document.createElement("textarea");
      return Result;
    };
    this.RegisterHandleEvents = function () {
      pas.Controls.TWinControl.RegisterHandleEvents.call(this);
      var $with = this.FHandleElement;
      $with.addEventListener("input",rtl.createSafeCallback(this,"HandleChange"));
    };
    this.UnRegisterHandleEvents = function () {
      pas.Controls.TWinControl.UnRegisterHandleEvents.call(this);
      var $with = this.FHandleElement;
      $with.removeEventListener("input",rtl.createSafeCallback(this,"HandleChange"));
    };
    this.CheckChildClassAllowed = function (AChildClass) {
      var Result = false;
      Result = false;
      return Result;
    };
    this.RealGetText = function () {
      var Result = "";
      Result = this.FLines.GetTextStr();
      return Result;
    };
    this.RealSetText = function (AValue) {
      this.FLines.SetTextStr(AValue);
      this.FModified = false;
      this.Changed();
    };
    this.GetControlClassDefaultSize = function () {
      var Result = pas.Types.TSize.$new();
      Result.cx = 150;
      Result.cy = 90;
      return Result;
    };
    this.Create$1 = function (AOwner) {
      pas.Controls.TControl.Create$1.call(this,AOwner);
      this.FLines = $impl.TCustomMemoStrings.$create("Create$1");
      this.FMaxLength = 0;
      this.FModified = false;
      this.FReadOnly = false;
      this.FTextHint = "";
      this.FWantReturns = true;
      this.FWantTabs = false;
      this.FWordWrap = true;
      this.BeginUpdate();
      try {
        var $with = this.$class.GetControlClassDefaultSize();
        this.SetBounds(0,0,$with.cx,$with.cy);
      } finally {
        this.EndUpdate();
      };
      return this;
    };
    this.Destroy = function () {
      this.FLines.$destroy("Destroy");
      this.FLines = null;
      pas.Controls.TControl.Destroy.call(this);
    };
    this.Append = function (AValue) {
      this.FLines.Append(AValue);
      this.Changed();
    };
  });
  rtl.createClass(this,"TCustomButton",pas.Controls.TWinControl,function () {
    this.$init = function () {
      pas.Controls.TWinControl.$init.call(this);
      this.FCancel = false;
      this.FDefault = false;
      this.FModalResult = 0;
    };
    this.SetCancel = function (AValue) {
      if (this.FCancel !== AValue) {
        this.FCancel = AValue;
      };
    };
    this.SetDefault = function (AValue) {
      if (this.FDefault !== AValue) {
        this.FDefault = AValue;
      };
    };
    this.Changed = function () {
      pas.Controls.TControl.Changed.call(this);
      if (!this.IsUpdating() && !(pas.Classes.TComponentStateItem.csLoading in this.FComponentState)) {
        var $with = this.FHandleElement;
        $with.style.setProperty("padding","0");
        $with.innerHTML = this.GetText();
      };
    };
    this.CreateHandleElement = function () {
      var Result = null;
      Result = document.createElement("button");
      return Result;
    };
    this.CheckChildClassAllowed = function (AChildClass) {
      var Result = false;
      Result = false;
      return Result;
    };
    this.GetControlClassDefaultSize = function () {
      var Result = pas.Types.TSize.$new();
      Result.cx = 80;
      Result.cy = 25;
      return Result;
    };
    this.Create$1 = function (AOwner) {
      pas.Controls.TControl.Create$1.call(this,AOwner);
      this.FModalResult = 0;
      this.BeginUpdate();
      try {
        var $with = this.$class.GetControlClassDefaultSize();
        this.SetBounds(0,0,$with.cx,$with.cy);
      } finally {
        this.EndUpdate();
      };
      return this;
    };
    this.AdjustSize = function () {
      var VSize = pas.Types.TSize.$new();
      pas.Controls.TControl.AdjustSize.call(this);
      VSize.$assign(this.FFont.TextExtent(this.GetText()));
      this.SetBounds(this.FLeft,this.FTop,VSize.cx,VSize.cy);
    };
    this.Click = function () {
      var VParent = null;
      if (this.FModalResult !== 0) {
        VParent = this.FParent;
        while (VParent != null) {
          if (pas.Forms.TCustomForm.isPrototypeOf(VParent)) {
            VParent.SetModalResult(this.FModalResult);
            break;
          };
          VParent = VParent.FParent;
        };
      };
      pas.Controls.TControl.Click.call(this);
    };
  });
  this.TCheckBoxState = {"0": "cbUnchecked", cbUnchecked: 0, "1": "cbChecked", cbChecked: 1, "2": "cbGrayed", cbGrayed: 2};
  this.$rtti.$Enum("TCheckBoxState",{minvalue: 0, maxvalue: 2, ordtype: 1, enumtype: this.TCheckBoxState});
  this.$rtti.$Enum("TLeftRight",{minvalue: 0, maxvalue: 1, ordtype: 1, enumtype: this.TAlignment});
  rtl.createClass(this,"TCustomCheckbox",pas.Controls.TWinControl,function () {
    this.$init = function () {
      pas.Controls.TWinControl.$init.call(this);
      this.FAlignment = pas.Classes.TAlignment.taLeftJustify;
      this.FLabelElement = null;
      this.FMarkElement = null;
      this.FState = 0;
      this.FOnChange = null;
      this.FAllowGrayed = false;
    };
    this.$final = function () {
      this.FLabelElement = undefined;
      this.FMarkElement = undefined;
      this.FOnChange = undefined;
      pas.Controls.TWinControl.$final.call(this);
    };
    this.GetChecked = function () {
      var Result = false;
      Result = this.GetState() === $mod.TCheckBoxState.cbChecked;
      return Result;
    };
    this.GetState = function () {
      var Result = 0;
      Result = this.FState;
      return Result;
    };
    this.SetAlignment = function (AValue) {
      if (this.FAlignment !== AValue) {
        this.FAlignment = AValue;
        this.Changed();
      };
    };
    this.SetChecked = function (AValue) {
      if (AValue) {
        this.SetState($mod.TCheckBoxState.cbChecked);
      } else {
        this.SetState($mod.TCheckBoxState.cbUnchecked);
      };
    };
    this.SetState = function (AValue) {
      if (this.FState !== AValue) {
        this.FState = AValue;
        this.Changed();
        this.DoOnChange();
      };
    };
    this.DoOnChange = function () {
      if (this.FOnChange != null) {
        this.FOnChange(this);
      };
    };
    this.HandleClick = function (AEvent) {
      var Result = false;
      this.SetChecked(this.FState !== $mod.TCheckBoxState.cbChecked);
      Result = pas.Controls.TControl.HandleClick.call(this,AEvent);
      return Result;
    };
    this.Changed = function () {
      pas.Controls.TControl.Changed.call(this);
      if (!this.IsUpdating() && !(pas.Classes.TComponentStateItem.csLoading in this.FComponentState)) {
        if (this.FAlignment === pas.Classes.TAlignment.taLeftJustify) {
          this.FHandleElement.removeChild(this.FMarkElement);
          this.FHandleElement.removeChild(this.FLabelElement);
          this.FLabelElement = this.CreateLabelElement();
          this.FMarkElement = this.CreateMarkElement();
        };
        var $with = this.FHandleElement;
        $with.style.setProperty("user-select","none");
        $with.style.setProperty("-moz-user-select","none");
        $with.style.setProperty("-ms-user-select","none");
        $with.style.setProperty("-khtml-user-select","none");
        $with.style.setProperty("-webkit-user-select","none");
        $with.style.setProperty("display","flex");
        $with.style.setProperty("align-items","center");
        var $with1 = this.FMarkElement;
        $with1.checked = this.FState === $mod.TCheckBoxState.cbChecked;
        $with1.indeterminate = this.FState === $mod.TCheckBoxState.cbGrayed;
        $with1.type = "checkbox";
        var $with2 = this.FLabelElement;
        if (pas.Graphics.TFontStyle.fsItalic in this.FFont.FStyle) $with2.style.setProperty("font-style","italic");
        if (pas.Graphics.TFontStyle.fsBold in this.FFont.FStyle) $with2.style.setProperty("font-weight","bold");
        $with2.innerHTML = this.GetText();
      };
    };
    this.CreateHandleElement = function () {
      var Result = null;
      Result = document.createElement("div");
      return Result;
    };
    this.CreateMarkElement = function () {
      var Result = null;
      Result = this.FHandleElement.appendChild(document.createElement("input"));
      return Result;
    };
    this.CreateLabelElement = function () {
      var Result = null;
      Result = this.FHandleElement.appendChild(document.createElement("span"));
      return Result;
    };
    this.CheckChildClassAllowed = function (AChildClass) {
      var Result = false;
      Result = false;
      return Result;
    };
    this.GetControlClassDefaultSize = function () {
      var Result = pas.Types.TSize.$new();
      Result.cx = 90;
      Result.cy = 23;
      return Result;
    };
    this.Create$1 = function (AOwner) {
      pas.Controls.TControl.Create$1.call(this,AOwner);
      this.FMarkElement = this.CreateMarkElement();
      this.FLabelElement = this.CreateLabelElement();
      this.FAlignment = pas.Classes.TAlignment.taRightJustify;
      this.FState = $mod.TCheckBoxState.cbUnchecked;
      try {
        var $with = this.$class.GetControlClassDefaultSize();
        this.SetBounds(0,0,$with.cx,$with.cy);
      } finally {
        this.EndUpdate();
      };
      return this;
    };
  });
  rtl.createClass(this,"TCustomLabel",pas.Controls.TWinControl,function () {
    this.$init = function () {
      pas.Controls.TWinControl.$init.call(this);
      this.FAlignment = 0;
      this.FContentElement = null;
      this.FFocusControl = null;
      this.FLayout = 0;
      this.FTransparent = false;
      this.FWordWrap = false;
    };
    this.$final = function () {
      this.FContentElement = undefined;
      this.FFocusControl = undefined;
      pas.Controls.TWinControl.$final.call(this);
    };
    this.SetAlignment = function (AValue) {
      if (this.FAlignment !== AValue) {
        this.FAlignment = AValue;
        this.Changed();
      };
    };
    this.SetLayout = function (AValue) {
      if (this.FLayout !== AValue) {
        this.FLayout = AValue;
        this.Changed();
      };
    };
    this.SetTransparent = function (AValue) {
      if (this.FTransparent !== AValue) {
        this.FTransparent = AValue;
        this.BeginUpdate();
        try {
          if (this.FTransparent) {
            this.SetColor(536870911);
          } else if (this.FColor === 536870911) {
            this.SetColor(-2147483647);
          };
        } finally {
          this.EndUpdate();
        };
      };
    };
    this.SetWordWrap = function (AValue) {
      if (this.FWordWrap !== AValue) {
        this.FWordWrap = AValue;
        this.Changed();
      };
    };
    this.DoEnter = function () {
      pas.Controls.TWinControl.DoEnter.call(this);
      if ((this.FFocusControl != null) && this.FFocusControl.CanSetFocus()) {
        this.FFocusControl.SetFocus();
      };
    };
    this.Changed = function () {
      pas.Controls.TControl.Changed.call(this);
      if (!this.IsUpdating() && !(pas.Classes.TComponentStateItem.csLoading in this.FComponentState)) {
        var $with = this.FHandleElement;
        if (this.FTransparent) {
          $with.style.setProperty("background-color","transparent");
        };
        $with.style.setProperty("outline","none");
        $with.style.setProperty("user-select","none");
        $with.style.setProperty("-moz-user-select","none");
        $with.style.setProperty("-ms-user-select","none");
        $with.style.setProperty("-khtml-user-select","none");
        $with.style.setProperty("-webkit-user-select","none");
        if (this.FAutoSize) {
          $with.style.removeProperty("height");
          $with.style.removeProperty("width");
        };
        var $with1 = this.FContentElement;
        $with1.innerHTML = "";
        var $tmp = this.FAlignment;
        if ($tmp === pas.Classes.TAlignment.taCenter) {
          $with1.style.setProperty("text-align","center")}
         else if ($tmp === pas.Classes.TAlignment.taLeftJustify) {
          $with1.style.setProperty("text-align","left")}
         else if ($tmp === pas.Classes.TAlignment.taRightJustify) $with1.style.setProperty("text-align","right");
        var $tmp1 = this.FLayout;
        if ($tmp1 === pas.Graphics.TTextLayout.tlBottom) {
          $with1.style.setProperty("vertical-align","bottom")}
         else if ($tmp1 === pas.Graphics.TTextLayout.tlCenter) {
          $with1.style.setProperty("vertical-align","middle")}
         else if ($tmp1 === pas.Graphics.TTextLayout.tlTop) $with1.style.setProperty("vertical-align","top");
        if (this.FWordWrap) {
          $with1.style.setProperty("word-wrap","break-word");
        } else {
          $with1.style.removeProperty("word-wrap");
        };
        $with1.style.setProperty("overflow","hidden");
        $with1.style.setProperty("text-overflow","ellipsis");
        $with1.innerHTML = this.GetText();
      };
    };
    this.CreateHandleElement = function () {
      var Result = null;
      Result = document.createElement("div");
      return Result;
    };
    this.CreateContentElement = function () {
      var Result = null;
      Result = this.FHandleElement.appendChild(document.createElement("label"));
      return Result;
    };
    this.CheckChildClassAllowed = function (AChildClass) {
      var Result = false;
      Result = false;
      return Result;
    };
    this.GetControlClassDefaultSize = function () {
      var Result = pas.Types.TSize.$new();
      Result.cx = 65;
      Result.cy = 17;
      return Result;
    };
    this.Create$1 = function (AOwner) {
      pas.Controls.TControl.Create$1.call(this,AOwner);
      this.FContentElement = this.CreateContentElement();
      this.FAlignment = pas.Classes.TAlignment.taLeftJustify;
      this.FFocusControl = null;
      this.FLayout = pas.Graphics.TTextLayout.tlTop;
      this.FTransparent = true;
      this.FWordWrap = false;
      this.BeginUpdate();
      try {
        this.SetTabStop(false);
        this.SetAutoSize(true);
        var $with = this.$class.GetControlClassDefaultSize();
        this.SetBounds(0,0,$with.cx,$with.cy);
      } finally {
        this.EndUpdate();
      };
      return this;
    };
    this.AdjustSize = function () {
      pas.Controls.TControl.AdjustSize.call(this);
      this.Changed();
    };
  });
  $mod.$implcode = function () {
    rtl.createClass($impl,"TCustomMemoStrings",pas.Classes.TStringList,function () {
    });
  };
},["RTLConsts"]);
rtl.module("ExtCtrls",["System","Classes","SysUtils","Types","Web","Graphics","Controls"],function () {
  "use strict";
  var $mod = this;
  rtl.createClass(this,"TCustomPanel",pas.Controls.TCustomControl,function () {
    this.$init = function () {
      pas.Controls.TCustomControl.$init.call(this);
      this.FContentElement = null;
      this.FAlignment = 0;
      this.FBevelColor = 0;
      this.FBevelInner = 0;
      this.FBevelOuter = 0;
      this.FBevelWidth = 0;
      this.FLayout = 0;
      this.FWordWrap = false;
    };
    this.$final = function () {
      this.FContentElement = undefined;
      pas.Controls.TCustomControl.$final.call(this);
    };
    this.SetAlignment = function (AValue) {
      if (this.FAlignment !== AValue) {
        this.FAlignment = AValue;
        this.Changed();
      };
    };
    this.SetBevelColor = function (AValue) {
      if (this.FBevelColor !== AValue) {
        this.FBevelColor = AValue;
        this.Changed();
      };
    };
    this.SetBevelOuter = function (AValue) {
      if (this.FBevelOuter !== AValue) {
        this.FBevelOuter = AValue;
        this.Changed();
      };
    };
    this.SetBevelWidth = function (AValue) {
      if (this.FBevelWidth !== AValue) {
        this.FBevelWidth = AValue;
        this.Changed();
      };
    };
    this.SetLayout = function (AValue) {
      if (this.FLayout !== AValue) {
        this.FLayout = AValue;
        this.Changed();
      };
    };
    this.Changed = function () {
      var VTopColor = 0;
      var VBottomColor = 0;
      pas.Controls.TControl.Changed.call(this);
      if (!this.IsUpdating() && !(pas.Classes.TComponentStateItem.csLoading in this.FComponentState)) {
        var $with = this.FHandleElement;
        if (this.FBevelOuter === pas.Controls.TBevelCut.bvNone) {
          $with.style.removeProperty("border-width");
          $with.style.removeProperty("border-left-color");
          $with.style.removeProperty("border-left-style");
          $with.style.removeProperty("border-top-color");
          $with.style.removeProperty("border-top-style");
          $with.style.removeProperty("border-right-color");
          $with.style.removeProperty("border-right-style");
          $with.style.removeProperty("border-bottom-color");
          $with.style.removeProperty("border-bottom-style");
        } else {
          if (this.FBevelColor === 536870912) {
            var $tmp = this.FBevelOuter;
            if ($tmp === pas.Controls.TBevelCut.bvLowered) {
              VTopColor = 8421504;
              VBottomColor = 16777215;
            } else if ($tmp === pas.Controls.TBevelCut.bvRaised) {
              VTopColor = 16777215;
              VBottomColor = 8421504;
            } else {
              VTopColor = this.FColor;
              VBottomColor = this.FColor;
            };
          } else {
            VTopColor = this.FBevelColor;
            VBottomColor = this.FBevelColor;
          };
          $with.style.setProperty("border-width",pas.SysUtils.IntToStr(this.FBevelWidth) + "px");
          $with.style.setProperty("border-style","solid");
          $with.style.setProperty("border-left-color",pas.Graphics.JSColor(VTopColor));
          $with.style.setProperty("border-top-color",pas.Graphics.JSColor(VTopColor));
          $with.style.setProperty("border-right-color",pas.Graphics.JSColor(VBottomColor));
          $with.style.setProperty("border-bottom-color",pas.Graphics.JSColor(VBottomColor));
        };
        $with.style.setProperty("outline","none");
        $with.style.setProperty("user-select","none");
        $with.style.setProperty("-moz-user-select","none");
        $with.style.setProperty("-ms-user-select","none");
        $with.style.setProperty("-khtml-user-select","none");
        $with.style.setProperty("-webkit-user-select","none");
        if (this.GetText() > "") {
          var $with1 = this.FContentElement;
          $with1.setAttribute("class","Caption");
          $with1.innerHTML = "";
          var $tmp1 = this.FAlignment;
          if ($tmp1 === pas.Classes.TAlignment.taCenter) {
            $with1.style.setProperty("text-align","center")}
           else if ($tmp1 === pas.Classes.TAlignment.taLeftJustify) {
            $with1.style.setProperty("text-align","left")}
           else if ($tmp1 === pas.Classes.TAlignment.taRightJustify) $with1.style.setProperty("text-align","right");
          var $tmp2 = this.FLayout;
          if ($tmp2 === pas.Graphics.TTextLayout.tlBottom) {
            $with1.style.setProperty("vertical-align","bottom")}
           else if ($tmp2 === pas.Graphics.TTextLayout.tlCenter) {
            $with1.style.setProperty("vertical-align","middle")}
           else if ($tmp2 === pas.Graphics.TTextLayout.tlTop) {
            $with1.style.setProperty("vertical-align","top")}
           else if ($tmp2 === pas.Graphics.TTextLayout.tlTitle) {
            $with1.style.setProperty("position","absolute");
            $with1.style.setProperty("top","-8px");
            $with1.style.setProperty("left","5px");
            $with1.style.setProperty("padding-left","5px");
            $with1.style.setProperty("padding-right","5px");
          };
          if (this.FWordWrap) {
            $with1.style.setProperty("word-wrap","break-word");
          } else {
            $with1.style.removeProperty("word-wrap");
          };
          $with1.style.setProperty("overflow","hidden");
          $with1.style.setProperty("text-overflow","ellipsis");
          $with1.innerHTML = this.GetText();
        };
      };
    };
    this.CreateHandleElement = function () {
      var Result = null;
      Result = document.createElement("div");
      return Result;
    };
    this.GetControlClassDefaultSize = function () {
      var Result = pas.Types.TSize.$new();
      Result.cx = 1;
      Result.cy = 1;
      return Result;
    };
    this.Create$1 = function (AOwner) {
      pas.Controls.TControl.Create$1.call(this,AOwner);
      this.FContentElement = this.FHandleElement.appendChild(document.createElement("label"));
      this.FAlignment = pas.Classes.TAlignment.taCenter;
      this.FBevelColor = 536870912;
      this.FBevelOuter = pas.Controls.TBevelCut.bvNone;
      this.FBevelInner = pas.Controls.TBevelCut.bvNone;
      this.FBevelWidth = 1;
      this.FLayout = pas.Graphics.TTextLayout.tlCenter;
      this.FWordWrap = false;
      this.BeginUpdate();
      try {
        this.SetTabStop(false);
        var $with = this.$class.GetControlClassDefaultSize();
        this.SetBounds(0,0,$with.cx,$with.cy);
      } finally {
        this.EndUpdate();
      };
      return this;
    };
  });
  rtl.createClass(this,"TCustomTimer",pas.Classes.TComponent,function () {
    this.$init = function () {
      pas.Classes.TComponent.$init.call(this);
      this.FEnabled = false;
      this.FInterval = 0;
      this.FTimerHandle = 0;
      this.FOnStartTimer = null;
      this.FOnStopTimer = null;
      this.FOnTimer = null;
    };
    this.$final = function () {
      this.FOnStartTimer = undefined;
      this.FOnStopTimer = undefined;
      this.FOnTimer = undefined;
      pas.Classes.TComponent.$final.call(this);
    };
    this.SetEnabled = function (AValue) {
      if (this.FEnabled === AValue) return;
      this.FEnabled = AValue;
      this.UpdateTimer();
    };
    this.SetInterval = function (AValue) {
      if (this.FInterval === AValue) return;
      this.FInterval = AValue;
      this.UpdateTimer();
    };
    this.SetOnTimer = function (AValue) {
      if (rtl.eqCallback(this.FOnTimer,AValue)) return;
      this.FOnTimer = AValue;
      this.UpdateTimer();
    };
    this.UpdateTimer = function () {
      var $Self = this;
      this.KillTimer();
      if (this.FEnabled && (this.FInterval > 0) && rtl.eqSet(rtl.intersectSet(rtl.createSet(pas.Classes.TComponentStateItem.csLoading,pas.Classes.TComponentStateItem.csDestroying),this.FComponentState),{}) && (this.FOnTimer != null)) {
        this.FTimerHandle = window.setInterval(function () {
          $Self.FOnTimer($Self);
        },this.FInterval);
        if (this.FTimerHandle === 0) throw pas.Classes.EOutOfResources.$create("Create$1",[rtl.getResStr(pas.LCLStrConsts,"rsNoTimers")]);
        if (this.FOnStartTimer != null) this.FOnStartTimer($Self);
      };
    };
    this.KillTimer = function () {
      if (this.FTimerHandle !== 0) {
        window.clearInterval(this.FTimerHandle);
        if (this.FOnStopTimer != null) this.FOnStopTimer(this);
      };
    };
    this.Loaded = function () {
      pas.Classes.TComponent.Loaded.call(this);
      this.UpdateTimer();
    };
    this.Create$1 = function (AOwner) {
      pas.Classes.TComponent.Create$1.call(this,AOwner);
      this.FEnabled = true;
      this.FInterval = 1000;
      this.FTimerHandle = 0;
      return this;
    };
    this.Destroy = function () {
      this.KillTimer();
      pas.Classes.TComponent.Destroy.call(this);
    };
  });
},["LCLStrConsts"]);
rtl.module("WebCtrls",["System","Classes","SysUtils","Types","Graphics","Controls","Forms","StdCtrls","ExtCtrls"],function () {
  "use strict";
  var $mod = this;
  rtl.createClass(this,"TCheckbox",pas.StdCtrls.TCustomCheckbox,function () {
    var $r = this.$rtti;
    $r.addProperty("Align",2,pas.Controls.$rtti["TAlign"],"FAlign","SetAlign");
    $r.addProperty("Alignment",2,pas.StdCtrls.$rtti["TLeftRight"],"FAlignment","SetAlignment",{Default: pas.Classes.TAlignment.taRightJustify});
    $r.addProperty("AllowGrayed",0,rtl.boolean,"FAllowGrayed","FAllowGrayed",{Default: true});
    $r.addProperty("Anchors",2,pas.Controls.$rtti["TAnchors"],"FAnchors","SetAnchors");
    $r.addProperty("AutoSize",2,rtl.boolean,"FAutoSize","SetAutoSize",{Default: false});
    $r.addProperty("BorderSpacing",2,pas.Controls.$rtti["TControlBorderSpacing"],"FBorderSpacing","SetBorderSpacing");
    $r.addProperty("Caption",3,pas.Controls.$rtti["TCaption"],"GetText","SetText");
    $r.addProperty("Checked",3,rtl.boolean,"GetChecked","SetChecked");
    $r.addProperty("Color",2,rtl.longint,"FColor","SetColor");
    $r.addProperty("Enabled",2,rtl.boolean,"FEnabled","SetEnabled");
    $r.addProperty("Font",2,pas.Graphics.$rtti["TFont"],"FFont","SetFont");
    $r.addProperty("HandleClass",2,rtl.string,"FHandleClass","SetHandleClass");
    $r.addProperty("HandleId",2,rtl.string,"FHandleId","SetHandleId");
    $r.addProperty("ParentColor",2,rtl.boolean,"FParentColor","SetParentColor");
    $r.addProperty("ParentFont",2,rtl.boolean,"FParentFont","SetParentFont");
    $r.addProperty("ParentShowHint",2,rtl.boolean,"FParentShowHint","SetParentShowHint");
    $r.addProperty("ShowHint",2,rtl.boolean,"FShowHint","SetShowHint");
    $r.addProperty("State",3,pas.StdCtrls.$rtti["TCheckBoxState"],"GetState","SetState",{Default: pas.StdCtrls.TCheckBoxState.cbUnchecked});
    $r.addProperty("TabOrder",2,rtl.nativeint,"FTabOrder","SetTabOrder");
    $r.addProperty("TabStop",2,rtl.boolean,"FTabStop","SetTabStop");
    $r.addProperty("Visible",2,rtl.boolean,"FVisible","SetVisible");
    $r.addProperty("OnChange",0,pas.Classes.$rtti["TNotifyEvent"],"FOnChange","FOnChange");
    $r.addProperty("OnClick",0,pas.Classes.$rtti["TNotifyEvent"],"FOnClick","FOnClick");
    $r.addProperty("OnEnter",0,pas.Classes.$rtti["TNotifyEvent"],"FOnEnter","FOnEnter");
    $r.addProperty("OnExit",0,pas.Classes.$rtti["TNotifyEvent"],"FOnExit","FOnExit");
    $r.addProperty("OnKeyPress",0,pas.Controls.$rtti["TKeyPressEvent"],"FOnKeyPress","FOnKeyPress");
    $r.addProperty("OnKeyDown",0,pas.Controls.$rtti["TKeyEvent"],"FOnKeyDown","FOnKeyDown");
    $r.addProperty("OnKeyUp",0,pas.Controls.$rtti["TKeyEvent"],"FOnKeyUp","FOnKeyUp");
    $r.addProperty("OnMouseDown",0,pas.Controls.$rtti["TMouseEvent"],"FOnMouseDown","FOnMouseDown");
    $r.addProperty("OnMouseEnter",0,pas.Classes.$rtti["TNotifyEvent"],"FOnMouseEnter","FOnMouseEnter");
    $r.addProperty("OnMouseLeave",0,pas.Classes.$rtti["TNotifyEvent"],"FOnMouseLeave","FOnMouseLeave");
    $r.addProperty("OnMouseMove",0,pas.Controls.$rtti["TMouseMoveEvent"],"FOnMouseMove","FOnMouseMove");
    $r.addProperty("OnMouseUp",0,pas.Controls.$rtti["TMouseEvent"],"FOnMouseUp","FOnMouseUp");
    $r.addProperty("OnMouseWheel",0,pas.Controls.$rtti["TMouseWheelEvent"],"FOnMouseWheel","FOnMouseWheel");
    $r.addProperty("OnResize",0,pas.Classes.$rtti["TNotifyEvent"],"FOnResize","FOnResize");
  });
});
rtl.module("browserapp",["System","Classes","SysUtils","Types","JS","Web"],function () {
  "use strict";
  var $mod = this;
  var $impl = $mod.$impl;
  this.ReloadEnvironmentStrings = function () {
    var I = 0;
    var S = "";
    var N = "";
    var A = [];
    var P = [];
    if ($impl.EnvNames != null) pas.SysUtils.FreeAndNil({p: $impl, get: function () {
        return this.p.EnvNames;
      }, set: function (v) {
        this.p.EnvNames = v;
      }});
    $impl.EnvNames = new Object();
    S = window.location.search;
    S = pas.System.Copy(S,2,S.length - 1);
    A = S.split("&");
    for (var $l = 0, $end = rtl.length(A) - 1; $l <= $end; $l++) {
      I = $l;
      P = A[I].split("=");
      N = pas.SysUtils.LowerCase(decodeURIComponent(P[0]));
      if (rtl.length(P) === 2) {
        $impl.EnvNames[N] = decodeURIComponent(P[1])}
       else if (rtl.length(P) === 1) $impl.EnvNames[N] = "";
    };
  };
  $mod.$implcode = function () {
    $impl.EnvNames = null;
    $impl.Params = [];
    $impl.ReloadParamStrings = function () {
      $impl.Params = rtl.arraySetLength($impl.Params,"",1);
      $impl.Params[0] = window.location.pathname;
    };
    $impl.GetParamCount = function () {
      var Result = 0;
      Result = rtl.length($impl.Params) - 1;
      return Result;
    };
    $impl.GetParamStr = function (Index) {
      var Result = "";
      Result = $impl.Params[Index];
      return Result;
    };
    $impl.MyGetEnvironmentVariable = function (EnvVar) {
      var Result = "";
      var aName = "";
      aName = pas.SysUtils.LowerCase(EnvVar);
      if ($impl.EnvNames.hasOwnProperty(aName)) {
        Result = "" + $impl.EnvNames[aName]}
       else Result = "";
      return Result;
    };
    $impl.MyGetEnvironmentVariableCount = function () {
      var Result = 0;
      Result = rtl.length(Object.getOwnPropertyNames($impl.EnvNames));
      return Result;
    };
    $impl.MyGetEnvironmentString = function (Index) {
      var Result = "";
      Result = "" + $impl.EnvNames[Object.getOwnPropertyNames($impl.EnvNames)[Index]];
      return Result;
    };
  };
  $mod.$init = function () {
    pas.System.IsConsole = true;
    pas.System.OnParamCount = $impl.GetParamCount;
    pas.System.OnParamStr = $impl.GetParamStr;
    $mod.ReloadEnvironmentStrings();
    $impl.ReloadParamStrings();
    pas.SysUtils.OnGetEnvironmentVariable = $impl.MyGetEnvironmentVariable;
    pas.SysUtils.OnGetEnvironmentVariableCount = $impl.MyGetEnvironmentVariableCount;
    pas.SysUtils.OnGetEnvironmentString = $impl.MyGetEnvironmentString;
  };
},[]);
rtl.module("TopCtrls",["System","TopTypes","Classes","SysUtils","Types","Graphics","Controls","StdCtrls","ExtCtrls","WebCtrls","Forms","Web","browserapp"],function () {
  "use strict";
  var $mod = this;
  rtl.createClass(this,"TCustomTrackBar",pas.Controls.TCustomControl,function () {
    this.$init = function () {
      pas.Controls.TCustomControl.$init.call(this);
      this.fMin = 0;
      this.fMax = 0;
      this.fPosition = 0;
      this.fFrequency = 0;
      this.fLineSize = 0;
      this.fPageSize = 0;
      this.fTickStyle = 0;
      this.FOnChange = null;
    };
    this.$final = function () {
      this.FOnChange = undefined;
      pas.Controls.TCustomControl.$final.call(this);
    };
    this.GetPosition = function () {
      var Result = 0;
      Result = this.fPosition;
      return Result;
    };
    this.SetPosition = function (Value) {
      this.fPosition = Value;
    };
    this.Changed = function () {
      this.GetCanvas().SetWidth(this.FWidth);
      this.GetCanvas().SetHeight(this.FHeight);
      pas.Controls.TControl.Changed.call(this);
    };
    this.Paint = function () {
      var i = 0;
      var x = 0;
      this.GetCanvas().Clear();
      this.GetCanvas().FBrush.SetColor(12632256);
      this.GetCanvas().FBrush.SetStyle(pas.Graphics.TBrushStyle.bsSolid);
      this.GetCanvas().FPen.SetColor(8421504);
      this.GetCanvas().FPen.SetStyle(pas.Graphics.TPenStyle.psSolid);
      this.GetCanvas().FPen.SetWidth(this.fLineSize);
      this.GetCanvas().Rectangle$1(0,Math.round((this.FHeight / 2) - 4),this.FWidth,8);
      for (var $l = this.fMin, $end = this.fMax; $l <= $end; $l++) {
        i = $l;
        x = Math.round(((i - this.fMin) / (this.fMax - this.fMin)) * this.FWidth);
        this.GetCanvas().MoveTo(x,Math.round((this.FHeight / 2) + 6));
        this.GetCanvas().LineTo(x,this.FHeight - 2);
      };
      this.GetCanvas().FBrush.SetColor(16711680);
      x = Math.round(((this.fPosition - this.fMin) / (this.fMax - this.fMin)) * this.FWidth);
      this.GetCanvas().FillRect$1(x - 4,4,8,16);
    };
    this.MouseUp = function (Button, Shift, X, Y) {
      this.fPosition = this.fMin + Math.round((X / this.FWidth) * (this.fMax - this.fMin));
      this.Invalidate();
      pas.Controls.TControl.MouseUp.call(this,Button,rtl.refSet(Shift),X,Y);
      if (this.FOnChange != null) this.FOnChange(this);
    };
    this.CreateHandleElement = function () {
      var Result = null;
      Result = document.createElement("div");
      return Result;
    };
    this.Create$1 = function (AOwner) {
      pas.Controls.TControl.Create$1.call(this,AOwner);
      this.fMax = 10;
      this.fFrequency = 1;
      this.fLineSize = 1;
      this.fPageSize = 2;
      this.fTickStyle = pas.TopTypes.TTickStyle.tsAuto;
      return this;
    };
  });
  rtl.createClass(this,"TCustomProgressBar",pas.Controls.TControl,function () {
    this.$init = function () {
      pas.Controls.TControl.$init.call(this);
      this.fMin = 0;
      this.fMax = 0;
      this.fPosition = 0;
      this.fStep = 0;
      this.BarElement = null;
    };
    this.$final = function () {
      this.BarElement = undefined;
      pas.Controls.TControl.$final.call(this);
    };
    this.GetPosition = function () {
      var Result = 0;
      Result = this.fPosition;
      return Result;
    };
    this.Changed = function () {
      pas.Controls.TControl.Changed.call(this);
      this.FHandleElement.style["background-color"] = pas.Graphics.JSColor(12632256);
      this.BarElement.style["width"] = pas.SysUtils.IntToStr(Math.round((this.GetPosition() / this.fMax) * 100)) + "%";
    };
    this.CreateHandleElement = function () {
      var Result = null;
      Result = document.createElement("div");
      this.BarElement = document.createElement("div");
      this.BarElement.style["height"] = "100%";
      this.BarElement.style["background-color"] = pas.Graphics.JSColor(32768);
      Result.appendChild(this.BarElement);
      return Result;
    };
    this.SetPosition = function (Value) {
      this.fPosition = Value;
      this.Changed();
    };
    this.Create$1 = function (AOwner) {
      pas.Controls.TControl.Create$1.call(this,AOwner);
      this.fMax = 100;
      this.fMin = 0;
      this.fStep = 10;
      return this;
    };
    this.StepIt = function () {
      this.fPosition = this.fPosition + this.fStep;
      this.Changed();
    };
  });
  rtl.createClass(this,"TMenuItem",pas.Controls.TWinControl,function () {
    this.$init = function () {
      pas.Controls.TWinControl.$init.call(this);
      this.AutoCheck = false;
      this.Checked = false;
      this.Findex = 0;
      this.FUpIndex = 0;
      this.LabelElement = null;
      this.SubMenuElement = null;
    };
    this.$final = function () {
      this.LabelElement = undefined;
      this.SubMenuElement = undefined;
      pas.Controls.TWinControl.$final.call(this);
    };
    this.Changed = function () {
      var i = 0;
      var m = null;
      pas.Controls.TControl.Changed.call(this);
      if (this.GetComponentCount() > 0) {
        if (this.SubMenuElement === null) {
          this.SubMenuElement = document.createElement("ul");
          this.SubMenuElement.style.setProperty("display","none");
          this.FHandleElement.appendChild(this.SubMenuElement);
        };
      };
      for (var $l = 0, $end = this.GetComponentCount() - 1; $l <= $end; $l++) {
        i = $l;
        m = this.GetComponent(i);
        this.SubMenuElement.appendChild(m.FHandleElement);
      };
      this.FHandleElement.style.removeProperty("left");
      this.FHandleElement.style.removeProperty("top");
      this.FHandleElement.style.removeProperty("width");
      this.FHandleElement.style.removeProperty("height");
      this.FHandleElement.style.removeProperty("display");
      this.FHandleElement.style.removeProperty("position");
      if (this.GetText() === "-") {
        this.SetText("_______________");
      };
      if (this.LabelElement !== null) this.LabelElement.innerHTML = this.GetText();
    };
    this.Click = function () {
      if ($mod.TPopupMenu.isPrototypeOf(this.FOwner)) this.FOwner.SetVisible(false);
      pas.Controls.TControl.Click.call(this);
    };
    this.MouseEnter = function () {
      if (this.FHandleId === "MainMenu") return;
      if (this.SubMenuElement !== null) {
        this.SubMenuElement.style.setProperty("display","block");
        if (this.FHeight === pas.TopTypes.MenuItemHeight) ;
      };
      pas.Controls.TControl.MouseEnter.call(this);
    };
    this.MouseLeave = function () {
      if (this.FHandleId === "MainMenu") return;
      if (this.SubMenuElement !== null) {
        this.SubMenuElement.style.setProperty("display","none");
      };
      pas.Controls.TControl.MouseLeave.call(this);
    };
    this.CreateHandleElement = function () {
      var Result = null;
      Result = document.createElement("li");
      this.LabelElement = document.createElement("div");
      Result.appendChild(this.LabelElement);
      return Result;
    };
    var $r = this.$rtti;
    $r.addField("AutoCheck",rtl.boolean);
    $r.addField("Checked",rtl.boolean);
    $r.addField("Findex",rtl.longint);
    $r.addField("FUpIndex",rtl.longint);
    $r.addField("LabelElement",pas.Web.$rtti["TJSHTMLElement"]);
    $r.addField("SubMenuElement",pas.Web.$rtti["TJSHTMLElement"]);
  });
  rtl.createClass(this,"TMainMenu",this.TMenuItem,function () {
    this.$init = function () {
      $mod.TMenuItem.$init.call(this);
      this.FMenuForm = null;
    };
    this.$final = function () {
      this.FMenuForm = undefined;
      $mod.TMenuItem.$final.call(this);
    };
    this.Changed = function () {
      var i = 0;
      var m = null;
      $mod.TMenuItem.Changed.call(this);
      if (this.SubMenuElement === null) {
        this.SubMenuElement = document.createElement("ul");
        this.FHandleElement.appendChild(this.SubMenuElement);
      };
      this.FOwner.SetTop(this.FHeight);
      for (var $l = 0, $end = this.GetComponentCount() - 1; $l <= $end; $l++) {
        i = $l;
        m = this.GetComponent(i);
        m.SetHandleId("MainMenuItem" + pas.SysUtils.IntToStr(i));
        m.SetHandleClass("MainMenuItem");
      };
      if (this.FMenuForm !== null) this.FMenuForm.appendChild(this.FHandleElement);
    };
    this.CreateHandleElement = function () {
      var Result = null;
      Result = document.createElement("div");
      return Result;
    };
    this.Create$1 = function (AOwner) {
      pas.Controls.TControl.Create$1.call(this,AOwner);
      this.SetLeft(0);
      this.SetTop(0);
      this.SetHeight(pas.TopTypes.MenuItemHeight + 5);
      this.SetVisible(true);
      this.SetHandleId("MainMenu");
      this.FMenuForm = document.createElement("div");
      this.FMenuForm.style.setProperty("width","100%");
      this.FMenuForm.id = this.FOwner.FHandleId;
      this.FOwner.SetHandleId(this.FOwner.FHandleId + "FORM");
      this.FMenuForm.appendChild(this.FOwner.FHandleElement);
      document.body.appendChild(this.FMenuForm);
      return this;
    };
  });
  rtl.createClass(this,"TPopupMenu",this.TMenuItem,function () {
    this.Changed = function () {
      $mod.TMenuItem.Changed.call(this);
      this.FHandleElement.style.setProperty("display","none");
    };
    this.Create$1 = function (AOwner) {
      pas.Controls.TControl.Create$1.call(this,AOwner);
      return this;
    };
    this.Popup = function (X, Y) {
      var r = null;
      r = this.FOwner.FHandleElement.getBoundingClientRect();
      this.SetLeft(pas.System.Trunc((X - r.left) + window.scrollX));
      this.SetTop(pas.System.Trunc((Y - r.top) + window.screenY) + pas.TopTypes.MenuItemHeight);
      this.SubMenuElement.style.setProperty("display","block");
      this.SubMenuElement.style.setProperty("position","absolute");
      this.SubMenuElement.style.setProperty("left",pas.SysUtils.IntToStr(this.FLeft) + "px");
      this.SubMenuElement.style.setProperty("top",pas.SysUtils.IntToStr(this.FTop) + "px");
      this.FHandleElement.style.setProperty("display","block");
    };
    this.OnContextMenu = function (Event) {
      var Result = false;
      this.Popup(Math.round(rtl.asExt(Event,MouseEvent).clientX) - this.FOwner.FLeft,Math.round(rtl.asExt(Event,MouseEvent).clientY) - this.FOwner.FTop);
      Result = false;
      return Result;
    };
  });
});
rtl.module("layui",["System","JS","Web","TopTypes","Classes","SysUtils","Types","Graphics","Controls","Forms","StdCtrls","ExtCtrls","TopCtrls"],function () {
  "use strict";
  var $mod = this;
  var $impl = $mod.$impl;
  rtl.createClass(this,"TComboBox",pas.StdCtrls.TCustomComboBox,function () {
    this.$init = function () {
      pas.StdCtrls.TCustomComboBox.$init.call(this);
      this.DroppedDown = false;
    };
    this.Changed = function () {
      pas.StdCtrls.TCustomComboBox.Changed.call(this);
      if (this.fStyle === pas.StdCtrls.TComboBoxStyle.csSimple) {
        this.SelectElement.setAttribute("lay-ignore","");
      };
      this.FHandleElement.setAttribute("class",this.FHandleElement.getAttribute("class") + " layui-form-item");
    };
    var $r = this.$rtti;
    $r.addField("DroppedDown",rtl.boolean);
    $r.addProperty("Align",2,pas.Controls.$rtti["TAlign"],"FAlign","SetAlign");
    $r.addProperty("Anchors",2,pas.Controls.$rtti["TAnchors"],"FAnchors","SetAnchors");
    $r.addProperty("AutoSize",2,rtl.boolean,"FAutoSize","SetAutoSize",{Default: false});
    $r.addProperty("BorderSpacing",2,pas.Controls.$rtti["TControlBorderSpacing"],"FBorderSpacing","SetBorderSpacing");
    $r.addProperty("BorderStyle",2,pas.Controls.$rtti["TBorderStyle"],"FBorderStyle","SetBorderStyle");
    $r.addProperty("Color",2,rtl.longint,"FColor","SetColor");
    $r.addProperty("Enabled",2,rtl.boolean,"FEnabled","SetEnabled");
    $r.addProperty("Font",2,pas.Graphics.$rtti["TFont"],"FFont","SetFont");
    $r.addProperty("HandleClass",2,rtl.string,"FHandleClass","SetHandleClass");
    $r.addProperty("HandleId",2,rtl.string,"FHandleId","SetHandleId");
    $r.addProperty("ItemHeight",2,rtl.nativeint,"FItemHeight","SetItemHeight");
    $r.addProperty("ItemIndex",2,rtl.nativeint,"FItemIndex","SetItemIndex");
    $r.addProperty("Items",2,pas.Classes.$rtti["TStrings"],"FItems","SetItems");
    $r.addProperty("ParentColor",2,rtl.boolean,"FParentColor","SetParentColor");
    $r.addProperty("ParentFont",2,rtl.boolean,"FParentFont","SetParentFont");
    $r.addProperty("ParentShowHint",2,rtl.boolean,"FParentShowHint","SetParentShowHint");
    $r.addProperty("ShowHint",2,rtl.boolean,"FShowHint","SetShowHint");
    $r.addProperty("TabOrder",2,rtl.nativeint,"FTabOrder","SetTabOrder");
    $r.addProperty("TabStop",2,rtl.boolean,"FTabStop","SetTabStop");
    $r.addProperty("Text",3,pas.Controls.$rtti["TCaption"],"GetText","SetText");
    $r.addProperty("Visible",2,rtl.boolean,"FVisible","SetVisible");
    $r.addProperty("OnChange",0,pas.Classes.$rtti["TNotifyEvent"],"FOnChange","FOnChange");
    $r.addProperty("OnClick",0,pas.Classes.$rtti["TNotifyEvent"],"FOnClick","FOnClick");
    $r.addProperty("OnDblClick",0,pas.Classes.$rtti["TNotifyEvent"],"FOnDblClick","FOnDblClick");
    $r.addProperty("OnEnter",0,pas.Classes.$rtti["TNotifyEvent"],"FOnEnter","FOnEnter");
    $r.addProperty("OnExit",0,pas.Classes.$rtti["TNotifyEvent"],"FOnExit","FOnExit");
    $r.addProperty("OnKeyDown",0,pas.Controls.$rtti["TKeyEvent"],"FOnKeyDown","FOnKeyDown");
    $r.addProperty("OnKeyPress",0,pas.Controls.$rtti["TKeyPressEvent"],"FOnKeyPress","FOnKeyPress");
    $r.addProperty("OnKeyUp",0,pas.Controls.$rtti["TKeyEvent"],"FOnKeyUp","FOnKeyUp");
    $r.addProperty("OnMouseDown",0,pas.Controls.$rtti["TMouseEvent"],"FOnMouseDown","FOnMouseDown");
    $r.addProperty("OnMouseEnter",0,pas.Classes.$rtti["TNotifyEvent"],"FOnMouseEnter","FOnMouseEnter");
    $r.addProperty("OnMouseLeave",0,pas.Classes.$rtti["TNotifyEvent"],"FOnMouseLeave","FOnMouseLeave");
    $r.addProperty("OnMouseMove",0,pas.Controls.$rtti["TMouseMoveEvent"],"FOnMouseMove","FOnMouseMove");
    $r.addProperty("OnMouseUp",0,pas.Controls.$rtti["TMouseEvent"],"FOnMouseUp","FOnMouseUp");
    $r.addProperty("OnMouseWheel",0,pas.Controls.$rtti["TMouseWheelEvent"],"FOnMouseWheel","FOnMouseWheel");
  });
  rtl.createClass(this,"TListBox",pas.StdCtrls.TCustomListBox,function () {
    this.Changed = function () {
      pas.StdCtrls.TCustomListBox.Changed.call(this);
      this.FHandleElement.setAttribute("lay-ignore","");
    };
    var $r = this.$rtti;
    $r.addProperty("Align",2,pas.Controls.$rtti["TAlign"],"FAlign","SetAlign");
    $r.addProperty("Anchors",2,pas.Controls.$rtti["TAnchors"],"FAnchors","SetAnchors");
    $r.addProperty("AutoSize",2,rtl.boolean,"FAutoSize","SetAutoSize",{Default: false});
    $r.addProperty("BorderSpacing",2,pas.Controls.$rtti["TControlBorderSpacing"],"FBorderSpacing","SetBorderSpacing");
    $r.addProperty("BorderStyle",2,pas.Controls.$rtti["TBorderStyle"],"FBorderStyle","SetBorderStyle");
    $r.addProperty("Color",2,rtl.longint,"FColor","SetColor");
    $r.addProperty("Enabled",2,rtl.boolean,"FEnabled","SetEnabled");
    $r.addProperty("Font",2,pas.Graphics.$rtti["TFont"],"FFont","SetFont");
    $r.addProperty("HandleClass",2,rtl.string,"FHandleClass","SetHandleClass");
    $r.addProperty("HandleId",2,rtl.string,"FHandleId","SetHandleId");
    $r.addProperty("ItemHeight",2,rtl.nativeint,"FItemHeight","SetItemHeight");
    $r.addProperty("ItemIndex",2,rtl.nativeint,"FItemIndex","SetItemIndex");
    $r.addProperty("Items",2,pas.Classes.$rtti["TStrings"],"FItems","SetItems");
    $r.addProperty("MultiSelect",2,rtl.boolean,"FMultiSelect","SetMultiSelect",{Default: false});
    $r.addProperty("ParentColor",2,rtl.boolean,"FParentColor","SetParentColor");
    $r.addProperty("ParentFont",2,rtl.boolean,"FParentFont","SetParentFont");
    $r.addProperty("ParentShowHint",2,rtl.boolean,"FParentShowHint","SetParentShowHint");
    $r.addProperty("ShowHint",2,rtl.boolean,"FShowHint","SetShowHint");
    $r.addProperty("TabOrder",2,rtl.nativeint,"FTabOrder","SetTabOrder");
    $r.addProperty("TabStop",2,rtl.boolean,"FTabStop","SetTabStop");
    $r.addProperty("Visible",2,rtl.boolean,"FVisible","SetVisible");
    $r.addProperty("OnClick",0,pas.Classes.$rtti["TNotifyEvent"],"FOnClick","FOnClick");
    $r.addProperty("OnDblClick",0,pas.Classes.$rtti["TNotifyEvent"],"FOnDblClick","FOnDblClick");
    $r.addProperty("OnEnter",0,pas.Classes.$rtti["TNotifyEvent"],"FOnEnter","FOnEnter");
    $r.addProperty("OnExit",0,pas.Classes.$rtti["TNotifyEvent"],"FOnExit","FOnExit");
    $r.addProperty("OnKeyDown",0,pas.Controls.$rtti["TKeyEvent"],"FOnKeyDown","FOnKeyDown");
    $r.addProperty("OnKeyPress",0,pas.Controls.$rtti["TKeyPressEvent"],"FOnKeyPress","FOnKeyPress");
    $r.addProperty("OnKeyUp",0,pas.Controls.$rtti["TKeyEvent"],"FOnKeyUp","FOnKeyUp");
    $r.addProperty("OnMouseDown",0,pas.Controls.$rtti["TMouseEvent"],"FOnMouseDown","FOnMouseDown");
    $r.addProperty("OnMouseEnter",0,pas.Classes.$rtti["TNotifyEvent"],"FOnMouseEnter","FOnMouseEnter");
    $r.addProperty("OnMouseLeave",0,pas.Classes.$rtti["TNotifyEvent"],"FOnMouseLeave","FOnMouseLeave");
    $r.addProperty("OnMouseMove",0,pas.Controls.$rtti["TMouseMoveEvent"],"FOnMouseMove","FOnMouseMove");
    $r.addProperty("OnMouseUp",0,pas.Controls.$rtti["TMouseEvent"],"FOnMouseUp","FOnMouseUp");
    $r.addProperty("OnMouseWheel",0,pas.Controls.$rtti["TMouseWheelEvent"],"FOnMouseWheel","FOnMouseWheel");
    $r.addProperty("OnSelectionChange",0,pas.StdCtrls.$rtti["TSelectionChangeEvent"],"FOnSelectionChange","FOnSelectionChange");
  });
  rtl.createClass(this,"TEdit",pas.StdCtrls.TCustomEdit,function () {
    var $r = this.$rtti;
    $r.addProperty("Align",2,pas.Controls.$rtti["TAlign"],"FAlign","SetAlign");
    $r.addProperty("Anchors",2,pas.Controls.$rtti["TAnchors"],"FAnchors","SetAnchors");
    $r.addProperty("Alignment",2,pas.Classes.$rtti["TAlignment"],"FAlignment","SetAlignment");
    $r.addProperty("AutoSize",2,rtl.boolean,"FAutoSize","SetAutoSize",{Default: false});
    $r.addProperty("BorderSpacing",2,pas.Controls.$rtti["TControlBorderSpacing"],"FBorderSpacing","SetBorderSpacing");
    $r.addProperty("BorderStyle",2,pas.Controls.$rtti["TBorderStyle"],"FBorderStyle","SetBorderStyle");
    $r.addProperty("CharCase",2,pas.StdCtrls.$rtti["TEditCharCase"],"FCharCase","SetCharCase");
    $r.addProperty("Color",2,rtl.longint,"FColor","SetColor");
    $r.addProperty("Enabled",2,rtl.boolean,"FEnabled","SetEnabled");
    $r.addProperty("Font",2,pas.Graphics.$rtti["TFont"],"FFont","SetFont");
    $r.addProperty("HandleClass",2,rtl.string,"FHandleClass","SetHandleClass");
    $r.addProperty("HandleId",2,rtl.string,"FHandleId","SetHandleId");
    $r.addProperty("MaxLength",2,rtl.nativeint,"FMaxLength","SetMaxLength");
    $r.addProperty("ParentColor",2,rtl.boolean,"FParentColor","SetParentColor");
    $r.addProperty("ParentFont",2,rtl.boolean,"FParentFont","SetParentFont");
    $r.addProperty("ParentShowHint",2,rtl.boolean,"FParentShowHint","SetParentShowHint");
    $r.addProperty("PasswordChar",2,rtl.char,"FPasswordChar","SetPasswordChar");
    $r.addProperty("ReadOnly",2,rtl.boolean,"FReadOnly","SetReadOnly");
    $r.addProperty("ShowHint",2,rtl.boolean,"FShowHint","SetShowHint");
    $r.addProperty("TabStop",2,rtl.boolean,"FTabStop","SetTabStop");
    $r.addProperty("TabOrder",2,rtl.nativeint,"FTabOrder","SetTabOrder");
    $r.addProperty("Text",3,pas.Controls.$rtti["TCaption"],"GetText","SetText");
    $r.addProperty("TextHint",2,rtl.string,"FTextHint","SetTextHint");
    $r.addProperty("Visible",2,rtl.boolean,"FVisible","SetVisible");
    $r.addProperty("OnChange",0,pas.Classes.$rtti["TNotifyEvent"],"FOnChange","FOnChange");
    $r.addProperty("OnClick",0,pas.Classes.$rtti["TNotifyEvent"],"FOnClick","FOnClick");
    $r.addProperty("OnDblClick",0,pas.Classes.$rtti["TNotifyEvent"],"FOnDblClick","FOnDblClick");
    $r.addProperty("OnEnter",0,pas.Classes.$rtti["TNotifyEvent"],"FOnEnter","FOnEnter");
    $r.addProperty("OnExit",0,pas.Classes.$rtti["TNotifyEvent"],"FOnExit","FOnExit");
    $r.addProperty("OnKeyDown",0,pas.Controls.$rtti["TKeyEvent"],"FOnKeyDown","FOnKeyDown");
    $r.addProperty("OnKeyPress",0,pas.Controls.$rtti["TKeyPressEvent"],"FOnKeyPress","FOnKeyPress");
    $r.addProperty("OnKeyUp",0,pas.Controls.$rtti["TKeyEvent"],"FOnKeyUp","FOnKeyUp");
    $r.addProperty("OnMouseDown",0,pas.Controls.$rtti["TMouseEvent"],"FOnMouseDown","FOnMouseDown");
    $r.addProperty("OnMouseEnter",0,pas.Classes.$rtti["TNotifyEvent"],"FOnMouseEnter","FOnMouseEnter");
    $r.addProperty("OnMouseLeave",0,pas.Classes.$rtti["TNotifyEvent"],"FOnMouseLeave","FOnMouseLeave");
    $r.addProperty("OnMouseMove",0,pas.Controls.$rtti["TMouseMoveEvent"],"FOnMouseMove","FOnMouseMove");
    $r.addProperty("OnMouseUp",0,pas.Controls.$rtti["TMouseEvent"],"FOnMouseUp","FOnMouseUp");
    $r.addProperty("OnMouseWheel",0,pas.Controls.$rtti["TMouseWheelEvent"],"FOnMouseWheel","FOnMouseWheel");
    $r.addProperty("OnResize",0,pas.Classes.$rtti["TNotifyEvent"],"FOnResize","FOnResize");
  });
  rtl.createClass(this,"TMemo",pas.StdCtrls.TCustomMemo,function () {
    var $r = this.$rtti;
    $r.addProperty("Align",2,pas.Controls.$rtti["TAlign"],"FAlign","SetAlign");
    $r.addProperty("Anchors",2,pas.Controls.$rtti["TAnchors"],"FAnchors","SetAnchors");
    $r.addProperty("Alignment",2,pas.Classes.$rtti["TAlignment"],"FAlignment","SetAlignment");
    $r.addProperty("BorderSpacing",2,pas.Controls.$rtti["TControlBorderSpacing"],"FBorderSpacing","SetBorderSpacing");
    $r.addProperty("BorderStyle",2,pas.Controls.$rtti["TBorderStyle"],"FBorderStyle","SetBorderStyle");
    $r.addProperty("CharCase",2,pas.StdCtrls.$rtti["TEditCharCase"],"FCharCase","SetCharCase");
    $r.addProperty("Color",2,rtl.longint,"FColor","SetColor");
    $r.addProperty("Enabled",2,rtl.boolean,"FEnabled","SetEnabled");
    $r.addProperty("Font",2,pas.Graphics.$rtti["TFont"],"FFont","SetFont");
    $r.addProperty("HandleClass",2,rtl.string,"FHandleClass","SetHandleClass");
    $r.addProperty("HandleId",2,rtl.string,"FHandleId","SetHandleId");
    $r.addProperty("Lines",2,pas.Classes.$rtti["TStrings"],"FLines","SetLines");
    $r.addProperty("Text",3,pas.Controls.$rtti["TCaption"],"GetText","SetText");
    $r.addProperty("MaxLength",2,rtl.nativeint,"FMaxLength","SetMaxLength");
    $r.addProperty("ParentColor",2,rtl.boolean,"FParentColor","SetParentColor");
    $r.addProperty("ParentFont",2,rtl.boolean,"FParentFont","SetParentFont");
    $r.addProperty("ParentShowHint",2,rtl.boolean,"FParentShowHint","SetParentShowHint");
    $r.addProperty("ReadOnly",2,rtl.boolean,"FReadOnly","SetReadOnly");
    $r.addProperty("ShowHint",2,rtl.boolean,"FShowHint","SetShowHint");
    $r.addProperty("TabOrder",2,rtl.nativeint,"FTabOrder","SetTabOrder");
    $r.addProperty("TabStop",2,rtl.boolean,"FTabStop","SetTabStop");
    $r.addProperty("TextHint",2,rtl.string,"FTextHint","SetTextHint");
    $r.addProperty("Visible",2,rtl.boolean,"FVisible","SetVisible");
    $r.addProperty("WantReturns",2,rtl.boolean,"FWantReturns","SetWantReturns");
    $r.addProperty("WantTabs",2,rtl.boolean,"FWantTabs","SetWantTabs");
    $r.addProperty("WordWrap",2,rtl.boolean,"FWordWrap","SetWordWrap");
    $r.addProperty("OnChange",0,pas.Classes.$rtti["TNotifyEvent"],"FOnChange","FOnChange");
    $r.addProperty("OnClick",0,pas.Classes.$rtti["TNotifyEvent"],"FOnClick","FOnClick");
    $r.addProperty("OnDblClick",0,pas.Classes.$rtti["TNotifyEvent"],"FOnDblClick","FOnDblClick");
    $r.addProperty("OnEnter",0,pas.Classes.$rtti["TNotifyEvent"],"FOnEnter","FOnEnter");
    $r.addProperty("OnExit",0,pas.Classes.$rtti["TNotifyEvent"],"FOnExit","FOnExit");
    $r.addProperty("OnKeyDown",0,pas.Controls.$rtti["TKeyEvent"],"FOnKeyDown","FOnKeyDown");
    $r.addProperty("OnKeyPress",0,pas.Controls.$rtti["TKeyPressEvent"],"FOnKeyPress","FOnKeyPress");
    $r.addProperty("OnKeyUp",0,pas.Controls.$rtti["TKeyEvent"],"FOnKeyUp","FOnKeyUp");
    $r.addProperty("OnMouseDown",0,pas.Controls.$rtti["TMouseEvent"],"FOnMouseDown","FOnMouseDown");
    $r.addProperty("OnMouseEnter",0,pas.Classes.$rtti["TNotifyEvent"],"FOnMouseEnter","FOnMouseEnter");
    $r.addProperty("OnMouseLeave",0,pas.Classes.$rtti["TNotifyEvent"],"FOnMouseLeave","FOnMouseLeave");
    $r.addProperty("OnMouseMove",0,pas.Controls.$rtti["TMouseMoveEvent"],"FOnMouseMove","FOnMouseMove");
    $r.addProperty("OnMouseUp",0,pas.Controls.$rtti["TMouseEvent"],"FOnMouseUp","FOnMouseUp");
    $r.addProperty("OnMouseWheel",0,pas.Controls.$rtti["TMouseWheelEvent"],"FOnMouseWheel","FOnMouseWheel");
    $r.addProperty("OnResize",0,pas.Classes.$rtti["TNotifyEvent"],"FOnResize","FOnResize");
  });
  rtl.createClass(this,"TButton",pas.StdCtrls.TCustomButton,function () {
    this.Changed = function () {
      pas.StdCtrls.TCustomButton.Changed.call(this);
      if (this.FHeight < 30) {
        this.FHandleElement.setAttribute("class","layui-btn layui-btn-xs")}
       else this.FHandleElement.setAttribute("class","layui-btn");
    };
    var $r = this.$rtti;
    $r.addProperty("Align",2,pas.Controls.$rtti["TAlign"],"FAlign","SetAlign");
    $r.addProperty("Anchors",2,pas.Controls.$rtti["TAnchors"],"FAnchors","SetAnchors");
    $r.addProperty("AutoSize",2,rtl.boolean,"FAutoSize","SetAutoSize",{Default: false});
    $r.addProperty("BorderSpacing",2,pas.Controls.$rtti["TControlBorderSpacing"],"FBorderSpacing","SetBorderSpacing");
    $r.addProperty("Caption",3,pas.Controls.$rtti["TCaption"],"GetText","SetText");
    $r.addProperty("Color",2,rtl.longint,"FColor","SetColor");
    $r.addProperty("Enabled",2,rtl.boolean,"FEnabled","SetEnabled");
    $r.addProperty("Font",2,pas.Graphics.$rtti["TFont"],"FFont","SetFont");
    $r.addProperty("HandleClass",2,rtl.string,"FHandleClass","SetHandleClass");
    $r.addProperty("HandleId",2,rtl.string,"FHandleId","SetHandleId");
    $r.addProperty("Hint",2,rtl.string,"FHint","SetHint");
    $r.addProperty("ModalResult",0,pas.Forms.$rtti["TModalResult"],"FModalResult","FModalResult");
    $r.addProperty("ParentFont",2,rtl.boolean,"FParentFont","SetParentFont");
    $r.addProperty("ParentShowHint",2,rtl.boolean,"FParentShowHint","SetParentShowHint");
    $r.addProperty("ShowHint",2,rtl.boolean,"FShowHint","SetShowHint");
    $r.addProperty("TabOrder",2,rtl.nativeint,"FTabOrder","SetTabOrder");
    $r.addProperty("TabStop",2,rtl.boolean,"FTabStop","SetTabStop");
    $r.addProperty("Visible",2,rtl.boolean,"FVisible","SetVisible");
    $r.addProperty("OnClick",0,pas.Classes.$rtti["TNotifyEvent"],"FOnClick","FOnClick");
    $r.addProperty("OnEnter",0,pas.Classes.$rtti["TNotifyEvent"],"FOnEnter","FOnEnter");
    $r.addProperty("OnExit",0,pas.Classes.$rtti["TNotifyEvent"],"FOnExit","FOnExit");
    $r.addProperty("OnKeyDown",0,pas.Controls.$rtti["TKeyEvent"],"FOnKeyDown","FOnKeyDown");
    $r.addProperty("OnKeyPress",0,pas.Controls.$rtti["TKeyPressEvent"],"FOnKeyPress","FOnKeyPress");
    $r.addProperty("OnKeyUp",0,pas.Controls.$rtti["TKeyEvent"],"FOnKeyUp","FOnKeyUp");
    $r.addProperty("OnMouseDown",0,pas.Controls.$rtti["TMouseEvent"],"FOnMouseDown","FOnMouseDown");
    $r.addProperty("OnMouseEnter",0,pas.Classes.$rtti["TNotifyEvent"],"FOnMouseEnter","FOnMouseEnter");
    $r.addProperty("OnMouseLeave",0,pas.Classes.$rtti["TNotifyEvent"],"FOnMouseLeave","FOnMouseLeave");
    $r.addProperty("OnMouseMove",0,pas.Controls.$rtti["TMouseMoveEvent"],"FOnMouseMove","FOnMouseMove");
    $r.addProperty("OnMouseUp",0,pas.Controls.$rtti["TMouseEvent"],"FOnMouseUp","FOnMouseUp");
    $r.addProperty("OnMouseWheel",0,pas.Controls.$rtti["TMouseWheelEvent"],"FOnMouseWheel","FOnMouseWheel");
    $r.addProperty("OnResize",0,pas.Classes.$rtti["TNotifyEvent"],"FOnResize","FOnResize");
  });
  rtl.createClass(this,"TCheckbox",pas.StdCtrls.TCustomCheckbox,function () {
    this.Changed = function () {
      pas.StdCtrls.TCustomCheckbox.Changed.call(this);
      this.FMarkElement.setAttribute("lay-skin","primary");
      this.FHandleElement.setAttribute("class","layui-form-item");
    };
    var $r = this.$rtti;
    $r.addProperty("Align",2,pas.Controls.$rtti["TAlign"],"FAlign","SetAlign");
    $r.addProperty("Alignment",2,pas.StdCtrls.$rtti["TLeftRight"],"FAlignment","SetAlignment",{Default: pas.Classes.TAlignment.taRightJustify});
    $r.addProperty("AllowGrayed",0,rtl.boolean,"FAllowGrayed","FAllowGrayed",{Default: true});
    $r.addProperty("Anchors",2,pas.Controls.$rtti["TAnchors"],"FAnchors","SetAnchors");
    $r.addProperty("AutoSize",2,rtl.boolean,"FAutoSize","SetAutoSize",{Default: false});
    $r.addProperty("BorderSpacing",2,pas.Controls.$rtti["TControlBorderSpacing"],"FBorderSpacing","SetBorderSpacing");
    $r.addProperty("Caption",3,pas.Controls.$rtti["TCaption"],"GetText","SetText");
    $r.addProperty("Checked",3,rtl.boolean,"GetChecked","SetChecked");
    $r.addProperty("Color",2,rtl.longint,"FColor","SetColor");
    $r.addProperty("Enabled",2,rtl.boolean,"FEnabled","SetEnabled");
    $r.addProperty("Font",2,pas.Graphics.$rtti["TFont"],"FFont","SetFont");
    $r.addProperty("HandleClass",2,rtl.string,"FHandleClass","SetHandleClass");
    $r.addProperty("HandleId",2,rtl.string,"FHandleId","SetHandleId");
    $r.addProperty("ParentColor",2,rtl.boolean,"FParentColor","SetParentColor");
    $r.addProperty("ParentFont",2,rtl.boolean,"FParentFont","SetParentFont");
    $r.addProperty("ParentShowHint",2,rtl.boolean,"FParentShowHint","SetParentShowHint");
    $r.addProperty("ShowHint",2,rtl.boolean,"FShowHint","SetShowHint");
    $r.addProperty("State",3,pas.StdCtrls.$rtti["TCheckBoxState"],"GetState","SetState",{Default: pas.StdCtrls.TCheckBoxState.cbUnchecked});
    $r.addProperty("TabOrder",2,rtl.nativeint,"FTabOrder","SetTabOrder");
    $r.addProperty("TabStop",2,rtl.boolean,"FTabStop","SetTabStop");
    $r.addProperty("Visible",2,rtl.boolean,"FVisible","SetVisible");
    $r.addProperty("OnChange",0,pas.Classes.$rtti["TNotifyEvent"],"FOnChange","FOnChange");
    $r.addProperty("OnClick",0,pas.Classes.$rtti["TNotifyEvent"],"FOnClick","FOnClick");
    $r.addProperty("OnEnter",0,pas.Classes.$rtti["TNotifyEvent"],"FOnEnter","FOnEnter");
    $r.addProperty("OnExit",0,pas.Classes.$rtti["TNotifyEvent"],"FOnExit","FOnExit");
    $r.addProperty("OnKeyPress",0,pas.Controls.$rtti["TKeyPressEvent"],"FOnKeyPress","FOnKeyPress");
    $r.addProperty("OnKeyDown",0,pas.Controls.$rtti["TKeyEvent"],"FOnKeyDown","FOnKeyDown");
    $r.addProperty("OnKeyUp",0,pas.Controls.$rtti["TKeyEvent"],"FOnKeyUp","FOnKeyUp");
    $r.addProperty("OnMouseDown",0,pas.Controls.$rtti["TMouseEvent"],"FOnMouseDown","FOnMouseDown");
    $r.addProperty("OnMouseEnter",0,pas.Classes.$rtti["TNotifyEvent"],"FOnMouseEnter","FOnMouseEnter");
    $r.addProperty("OnMouseLeave",0,pas.Classes.$rtti["TNotifyEvent"],"FOnMouseLeave","FOnMouseLeave");
    $r.addProperty("OnMouseMove",0,pas.Controls.$rtti["TMouseMoveEvent"],"FOnMouseMove","FOnMouseMove");
    $r.addProperty("OnMouseUp",0,pas.Controls.$rtti["TMouseEvent"],"FOnMouseUp","FOnMouseUp");
    $r.addProperty("OnMouseWheel",0,pas.Controls.$rtti["TMouseWheelEvent"],"FOnMouseWheel","FOnMouseWheel");
    $r.addProperty("OnResize",0,pas.Classes.$rtti["TNotifyEvent"],"FOnResize","FOnResize");
  });
  rtl.createClass(this,"TLabel",pas.StdCtrls.TCustomLabel,function () {
    var $r = this.$rtti;
    $r.addProperty("Align",2,pas.Controls.$rtti["TAlign"],"FAlign","SetAlign");
    $r.addProperty("Alignment",2,pas.Classes.$rtti["TAlignment"],"FAlignment","SetAlignment");
    $r.addProperty("Anchors",2,pas.Controls.$rtti["TAnchors"],"FAnchors","SetAnchors");
    $r.addProperty("AutoSize",2,rtl.boolean,"FAutoSize","SetAutoSize",{Default: true});
    $r.addProperty("BorderSpacing",2,pas.Controls.$rtti["TControlBorderSpacing"],"FBorderSpacing","SetBorderSpacing");
    $r.addProperty("Caption",3,pas.Controls.$rtti["TCaption"],"GetText","SetText");
    $r.addProperty("Color",2,rtl.longint,"FColor","SetColor");
    $r.addProperty("Enabled",2,rtl.boolean,"FEnabled","SetEnabled");
    $r.addProperty("FocusControl",0,pas.Controls.$rtti["TWinControl"],"FFocusControl","FFocusControl");
    $r.addProperty("Font",2,pas.Graphics.$rtti["TFont"],"FFont","SetFont");
    $r.addProperty("HandleClass",2,rtl.string,"FHandleClass","SetHandleClass");
    $r.addProperty("HandleId",2,rtl.string,"FHandleId","SetHandleId");
    $r.addProperty("Layout",2,pas.Graphics.$rtti["TTextLayout"],"FLayout","SetLayout");
    $r.addProperty("ParentColor",2,rtl.boolean,"FParentColor","SetParentColor");
    $r.addProperty("ParentFont",2,rtl.boolean,"FParentFont","SetParentFont");
    $r.addProperty("ParentShowHint",2,rtl.boolean,"FParentShowHint","SetParentShowHint");
    $r.addProperty("ShowHint",2,rtl.boolean,"FShowHint","SetShowHint");
    $r.addProperty("Transparent",2,rtl.boolean,"FTransparent","SetTransparent");
    $r.addProperty("Visible",2,rtl.boolean,"FVisible","SetVisible");
    $r.addProperty("WordWrap",2,rtl.boolean,"FWordWrap","SetWordWrap");
    $r.addProperty("OnClick",0,pas.Classes.$rtti["TNotifyEvent"],"FOnClick","FOnClick");
    $r.addProperty("OnDblClick",0,pas.Classes.$rtti["TNotifyEvent"],"FOnDblClick","FOnDblClick");
    $r.addProperty("OnMouseDown",0,pas.Controls.$rtti["TMouseEvent"],"FOnMouseDown","FOnMouseDown");
    $r.addProperty("OnMouseEnter",0,pas.Classes.$rtti["TNotifyEvent"],"FOnMouseEnter","FOnMouseEnter");
    $r.addProperty("OnMouseLeave",0,pas.Classes.$rtti["TNotifyEvent"],"FOnMouseLeave","FOnMouseLeave");
    $r.addProperty("OnMouseMove",0,pas.Controls.$rtti["TMouseMoveEvent"],"FOnMouseMove","FOnMouseMove");
    $r.addProperty("OnMouseUp",0,pas.Controls.$rtti["TMouseEvent"],"FOnMouseUp","FOnMouseUp");
    $r.addProperty("OnMouseWheel",0,pas.Controls.$rtti["TMouseWheelEvent"],"FOnMouseWheel","FOnMouseWheel");
    $r.addProperty("OnResize",0,pas.Classes.$rtti["TNotifyEvent"],"FOnResize","FOnResize");
  });
  rtl.createClass(this,"TTimer",pas.ExtCtrls.TCustomTimer,function () {
    var $r = this.$rtti;
    $r.addProperty("Enabled",2,rtl.boolean,"FEnabled","SetEnabled",{Default: true});
    $r.addProperty("Interval",2,rtl.longword,"FInterval","SetInterval",{Default: 1000});
    $r.addProperty("OnTimer",2,pas.Classes.$rtti["TNotifyEvent"],"FOnTimer","SetOnTimer");
    $r.addProperty("OnStartTimer",0,pas.Classes.$rtti["TNotifyEvent"],"FOnStartTimer","FOnStartTimer");
    $r.addProperty("OnStopTimer",0,pas.Classes.$rtti["TNotifyEvent"],"FOnStopTimer","FOnStopTimer");
  });
  rtl.createClass(this,"TProgressBar",pas.TopCtrls.TCustomProgressBar,function () {
    this.Changed = function () {
      pas.TopCtrls.TCustomProgressBar.Changed.call(this);
      this.FHandleElement.style.removeProperty("background-color");
      this.FHandleElement.setAttribute("class",this.FHandleElement.getAttribute("class") + " layui-progress ");
      this.BarElement.setAttribute("class",'layui-progress-bar lay-filter="demo"');
      this.BarElement.style["height"] = "100%";
      this.BarElement.style["width"] = pas.SysUtils.IntToStr(Math.round((this.GetPosition() / this.fMax) * 100)) + "%";
      this.BarElement.setAttribute("lay-percent",pas.SysUtils.IntToStr(Math.round((this.GetPosition() / this.fMax) * 100)) + "%");
    };
    this.SetPosition = function (Value) {
      pas.TopCtrls.TCustomProgressBar.SetPosition.apply(this,arguments);
    };
  });
  rtl.createClass(this,"TTrackBar",pas.TopCtrls.TCustomTrackBar,function () {
    this.Changed = function () {
      var $Self = this;
      var id = "";
      var iMin = 0;
      var iMax = 0;
      var iStep = 0;
      var changed = null;
      pas.TopCtrls.TCustomTrackBar.Changed.call(this);
      $Self.SetHandleId($Self.FName);
      this.FHandleElement.style.setProperty("margin","5px");
      this.FHandleElement.setAttribute("id",this.FHandleId);
      id = "#" + this.FHandleId;
      changed = function (value) {
        $Self.SetPosition(value);
        if ($Self.FOnChange != null) $Self.FOnChange($Self);
      };
      iMin = this.fMin;
      iMax = this.fMax;
      iStep = this.fFrequency;
      layui.slider.render({
        elem: id,
        min:iMin,
        max:iMax,
        step:iStep,
        change:changed
      });
    };
    this.Paint = function () {
    };
    this.CreateHandleElement = function () {
      var Result = null;
      Result = document.createElement("div");
      return Result;
    };
    this.MouseUp = function (Button, Shift, X, Y) {
    };
    this.Create$1 = function (AOwner) {
      var $Self = this;
      pas.TopCtrls.TCustomTrackBar.Create$1.call(this,AOwner);
      layui.use(["slider"],function () {
      });
      return this;
    };
  });
  rtl.createClass(this,"TMainMenu",pas.TopCtrls.TMainMenu,function () {
    this.Create$1 = function (AOwner) {
      var $Self = this;
      pas.TopCtrls.TMainMenu.Create$1.call(this,AOwner);
      layui.use(["dropdown"],function () {
      });
      return this;
    };
  });
  rtl.createClass(this,"TMenuItem",pas.TopCtrls.TMenuItem,function () {
    this.Changed = function () {
      this.LabelElement.setAttribute("class","layui-menu-body-title");
      if (this.GetText() === "-") {
        this.SetHandleClass("layui-menu-item-divider");
        if (this.FHandleElement.contains(this.LabelElement)) this.FHandleElement.removeChild(this.LabelElement);
      };
      pas.TopCtrls.TMenuItem.Changed.call(this);
      if (this.SubMenuElement !== null) this.SubMenuElement.setAttribute("class"," layui-menu");
    };
  });
  rtl.createClass(this,"TPopupMenu",pas.TopCtrls.TPopupMenu,function () {
    this.Changed = function () {
      pas.TopCtrls.TPopupMenu.Changed.call(this);
      if (this.SubMenuElement !== null) this.SubMenuElement.setAttribute("class"," layui-menu");
    };
    this.Create$1 = function (AOwner) {
      var $Self = this;
      pas.TopCtrls.TPopupMenu.Create$1.call(this,AOwner);
      layui.use(["dropdown"],function () {
      });
      return this;
    };
  });
  this.TMsgDlgType = {"0": "mtWarning", mtWarning: 0, "1": "mtError", mtError: 1, "2": "mtInformation", mtInformation: 2, "3": "mtConfirmation", mtConfirmation: 3, "4": "mtCustom", mtCustom: 4};
  this.TMsgDlgBtn = {"0": "mbYes", mbYes: 0, "1": "mbNo", mbNo: 1, "2": "mbOK", mbOK: 2, "3": "mbCancel", mbCancel: 3, "4": "mbAbort", mbAbort: 4, "5": "mbRetry", mbRetry: 5, "6": "mbIgnore", mbIgnore: 6, "7": "mbAll", mbAll: 7, "8": "mbNoToAll", mbNoToAll: 8, "9": "mbYesToAll", mbYesToAll: 9, "10": "mbHelp", mbHelp: 10, "11": "mbClose", mbClose: 11};
  this.MessageDlg = function (AOwner, ACaption, AMessage, ADlgType, AButtons, ADefaultButton, AModalResultProc) {
    var index2= layer.open({
             closeBtn: 0,
              icon: 0,
            title :ACaption,
    
      content: AMessage
        });
  };
  this.MessageDlg$2 = function (AOwner, ACaption, AMessage, ADlgType, AButtons, AModalResultProc) {
    $mod.MessageDlg(AOwner,ACaption,AMessage,ADlgType,rtl.refSet(AButtons),$impl.ModalDefaultButton(AButtons),AModalResultProc);
  };
  this.ShowMessage$1 = function (AMessage) {
    $mod.MessageDlg$2(pas.Forms.Application().FActiveForm,"",AMessage,$mod.TMsgDlgType.mtInformation,rtl.createSet($mod.TMsgDlgBtn.mbOK),null);
  };
  this.layui_use = function () {
    layui.use(["layer","form"],function () {
    });
  };
  this.layui_open = function () {
    var index2= layer.open({
    
      type:1,
      title :['Form1', 'font-size:12px;'],
     area:['455px','667px'],
      maxmin: true,
      scrollbar: false,
      shade:0,
      skin: 'layer-form',
      'end': function(){layui.$('#form1').remove();},
      content: layui.$('#form1')
        });
       layui.form.render();
    $mod.isLoad = true;
  };
  this.isLoad = false;
  $mod.$implcode = function () {
    $impl.ModalDefaultButton = function (AButtons) {
      var Result = 0;
      if ($mod.TMsgDlgBtn.mbYes in AButtons) {
        Result = $mod.TMsgDlgBtn.mbYes;
      } else if ($mod.TMsgDlgBtn.mbOK in AButtons) {
        Result = $mod.TMsgDlgBtn.mbOK;
      } else if ($mod.TMsgDlgBtn.mbYesToAll in AButtons) {
        Result = $mod.TMsgDlgBtn.mbYesToAll;
      } else if ($mod.TMsgDlgBtn.mbAll in AButtons) {
        Result = $mod.TMsgDlgBtn.mbAll;
      } else if ($mod.TMsgDlgBtn.mbRetry in AButtons) {
        Result = $mod.TMsgDlgBtn.mbRetry;
      } else if ($mod.TMsgDlgBtn.mbHelp in AButtons) {
        Result = $mod.TMsgDlgBtn.mbHelp;
      } else if ($mod.TMsgDlgBtn.mbCancel in AButtons) {
        Result = $mod.TMsgDlgBtn.mbCancel;
      } else if ($mod.TMsgDlgBtn.mbNo in AButtons) {
        Result = $mod.TMsgDlgBtn.mbNo;
      } else if ($mod.TMsgDlgBtn.mbNoToAll in AButtons) {
        Result = $mod.TMsgDlgBtn.mbNoToAll;
      } else if ($mod.TMsgDlgBtn.mbAbort in AButtons) {
        Result = $mod.TMsgDlgBtn.mbAbort;
      } else if ($mod.TMsgDlgBtn.mbIgnore in AButtons) {
        Result = $mod.TMsgDlgBtn.mbIgnore;
      } else if ($mod.TMsgDlgBtn.mbClose in AButtons) {
        Result = $mod.TMsgDlgBtn.mbClose;
      } else {
        Result = $mod.TMsgDlgBtn.mbOK;
      };
      return Result;
    };
  };
  $mod.$init = function () {
    $mod.layui_use();
  };
},[]);
rtl.module("WebCtrlsMore",["System","TopTypes","TopCtrls","Classes","SysUtils","Types","Graphics","Controls","StdCtrls","ExtCtrls","WebCtrls","Forms","Web","browserapp"],function () {
  "use strict";
  var $mod = this;
  rtl.createClass(this,"TGroupBox",pas.ExtCtrls.TCustomPanel,function () {
    this.Changed = function () {
      this.SetBevelWidth(1);
      this.SetBevelColor(12632256);
      this.SetBevelOuter(pas.Controls.TBevelCut.bvSpace);
      this.SetLayout(pas.Graphics.TTextLayout.tlTitle);
      pas.ExtCtrls.TCustomPanel.Changed.call(this);
      this.FHandleElement.style.removeProperty("overflow");
    };
  });
  this.TOpenOption = {"0": "ofReadOnly", ofReadOnly: 0, "1": "ofOverwritePrompt", ofOverwritePrompt: 1, "2": "ofHideReadOnly", ofHideReadOnly: 2, "3": "ofNoChangeDir", ofNoChangeDir: 3, "4": "ofShowHelp", ofShowHelp: 4, "5": "ofNoValidate", ofNoValidate: 5, "6": "ofAllowMultiSelect", ofAllowMultiSelect: 6, "7": "ofExtensionDifferent", ofExtensionDifferent: 7, "8": "ofPathMustExist", ofPathMustExist: 8, "9": "ofFileMustExist", ofFileMustExist: 9, "10": "ofCreatePrompt", ofCreatePrompt: 10, "11": "ofShareAware", ofShareAware: 11, "12": "ofNoReadOnlyReturn", ofNoReadOnlyReturn: 12, "13": "ofNoTestFileCreate", ofNoTestFileCreate: 13, "14": "ofNoNetworkButton", ofNoNetworkButton: 14, "15": "ofNoLongNames", ofNoLongNames: 15, "16": "ofOldStyleDialog", ofOldStyleDialog: 16, "17": "ofNoDereferenceLinks", ofNoDereferenceLinks: 17, "18": "ofEnableIncludeNotify", ofEnableIncludeNotify: 18, "19": "ofEnableSizing", ofEnableSizing: 19, "20": "ofDontAddToRecent", ofDontAddToRecent: 20, "21": "ofForceShowHidden", ofForceShowHidden: 21, "22": "ofViewDetail", ofViewDetail: 22, "23": "ofAutoPreview", ofAutoPreview: 23};
  this.$rtti.$Enum("TOpenOption",{minvalue: 0, maxvalue: 23, ordtype: 1, enumtype: this.TOpenOption});
  this.$rtti.$Set("TOpenOptions",{comptype: this.$rtti["TOpenOption"]});
  rtl.createClass(this,"TOpenDialog",pas.Classes.TComponent,function () {
    this.$init = function () {
      pas.Classes.TComponent.$init.call(this);
      this.FInputElement = null;
      this.FOnChange = null;
      this.FProcChange = null;
      this.FileName = "";
      this.Filter = "";
      this.FilterIndex = 0;
      this.InitialDir = "";
      this.Options = {};
      this.Title = "";
    };
    this.$final = function () {
      this.FInputElement = undefined;
      this.FOnChange = undefined;
      this.FProcChange = undefined;
      this.Options = undefined;
      pas.Classes.TComponent.$final.call(this);
    };
    this.Create$1 = function (AOwner) {
      pas.Classes.TComponent.Create$1.call(this,AOwner);
      this.FInputElement = document.createElement("input");
      this.FInputElement.type = "file";
      return this;
    };
    this.Execute$1 = function (Proc) {
      var $Self = this;
      var Result = false;
      this.FInputElement.onchange = function (Event) {
        var Result = false;
        if ($Self.FInputElement.files.length > 0) $Self.FileName = $Self.FInputElement.files.item(0).name;
        if ($Self.FProcChange != null) $Self.FProcChange();
        return Result;
      };
      this.FProcChange = Proc;
      this.FInputElement.click();
      return Result;
    };
    var $r = this.$rtti;
    $r.addField("FInputElement",pas.Web.$rtti["TJSHTMLInputElement"]);
    $r.addField("FOnChange",pas.Classes.$rtti["TNotifyEvent"]);
    $r.addField("FProcChange",pas.Types.$rtti["TProc"]);
    $r.addField("FileName",rtl.string);
    $r.addField("Filter",rtl.string);
    $r.addField("FilterIndex",rtl.longint);
    $r.addField("InitialDir",rtl.string);
    $r.addField("Options",$mod.$rtti["TOpenOptions"]);
    $r.addField("Title",rtl.string);
  });
  rtl.createClass(this,"TSaveDialog",pas.Classes.TComponent,function () {
    this.$init = function () {
      pas.Classes.TComponent.$init.call(this);
      this.FInputElement = null;
      this.FOnChange = null;
      this.FileName = "";
      this.Filter = "";
      this.FilterIndex = 0;
      this.InitialDir = "";
      this.Options = {};
      this.Title = "";
    };
    this.$final = function () {
      this.FInputElement = undefined;
      this.FOnChange = undefined;
      this.Options = undefined;
      pas.Classes.TComponent.$final.call(this);
    };
    this.Create$1 = function (AOwner) {
      pas.Classes.TComponent.Create$1.call(this,AOwner);
      this.FInputElement = document.createElement("input");
      this.FInputElement.type = "file";
      return this;
    };
    this.Execute = function () {
      var $Self = this;
      var Result = false;
      this.FInputElement.onchange = function (Event) {
        var Result = false;
        if ($Self.FInputElement.files.length > 0) $Self.FileName = $Self.FInputElement.files.item(0).name;
        if ($Self.FOnChange != null) $Self.FOnChange($Self);
        return Result;
      };
      this.FInputElement.click();
      return Result;
    };
    var $r = this.$rtti;
    $r.addField("FInputElement",pas.Web.$rtti["TJSHTMLInputElement"]);
    $r.addField("FOnChange",pas.Classes.$rtti["TNotifyEvent"]);
    $r.addField("FileName",rtl.string);
    $r.addField("Filter",rtl.string);
    $r.addField("FilterIndex",rtl.longint);
    $r.addField("InitialDir",rtl.string);
    $r.addField("Options",$mod.$rtti["TOpenOptions"]);
    $r.addField("Title",rtl.string);
  });
  rtl.createClass(this,"TRadioButton",pas.WebCtrls.TCheckbox,function () {
    this.Changed = function () {
      pas.StdCtrls.TCustomCheckbox.Changed.call(this);
      var $with = this.FMarkElement;
      $with.type = "radio";
      this.FMarkElement.setAttribute("name",this.FOwner.FName);
    };
  });
  rtl.createClass(this,"TStaticText",pas.ExtCtrls.TCustomPanel,function () {
    this.$init = function () {
      pas.ExtCtrls.TCustomPanel.$init.call(this);
      this.BorderStyle = 0;
    };
    this.Changed = function () {
      var $tmp = this.BorderStyle;
      if ($tmp === pas.TopTypes.TStaticBorderStyle.sbsNone) {
        this.SetBevelWidth(0);
        this.SetBevelOuter(pas.Controls.TBevelCut.bvNone);
      } else if ($tmp === pas.TopTypes.TStaticBorderStyle.sbsSingle) {
        this.SetBevelWidth(1);
        this.SetBevelColor(0);
        this.SetBevelOuter(pas.Controls.TBevelCut.bvSpace);
      } else if ($tmp === pas.TopTypes.TStaticBorderStyle.sbsSunken) {
        this.SetBevelWidth(1);
        this.SetBevelOuter(pas.Controls.TBevelCut.bvLowered);
      };
      pas.ExtCtrls.TCustomPanel.Changed.call(this);
    };
    var $r = this.$rtti;
    $r.addField("BorderStyle",pas.TopTypes.$rtti["TStaticBorderStyle"]);
  });
  rtl.createClass(this,"TXPManifest",pas.Classes.TComponent,function () {
  });
  rtl.createClass(this,"TMouse",pas.Controls.TWinControl,function () {
    this.$init = function () {
      pas.Controls.TWinControl.$init.call(this);
      this.CursorPos = pas.Types.TPoint.$new();
    };
    this.$final = function () {
      this.CursorPos = undefined;
      pas.Controls.TWinControl.$final.call(this);
    };
    var $r = this.$rtti;
    $r.addField("CursorPos",pas.Types.$rtti["TPoint"]);
  });
  this.Mouse = null;
  $mod.$init = function () {
    $mod.Mouse = $mod.TMouse.$create("Create");
  };
});
 
 
 
 rtl.module("Unit1",["System","SysUtils","Classes","Controls","StdCtrls","Forms","layui","Web","WebCtrlsMore"],function () {
  "use strict";
  var $mod = this;
  var $impl = $mod.$impl;
  rtl.createClass(this,"TForm1",pas.Forms.TForm,function () {
    this.$init = function () {
      pas.Forms.TForm.$init.call(this);
      this.Button1 = null;
      this.Button2 = null;
      this.Button3 = null;
      this.Button4 = null;
      this.Button5 = null;
      this.Button6 = null;
      this.Button7 = null;
      this.Button8 = null;
      this.Button9 = null;
      this.Button10 = null;
      this.Button11 = null;
      this.Edit1 = null;
      this.ComboBox1 = null;
      this.ListBox1 = null;
      this.Memo1 = null;
      this.CheckBox1 = null;
      this.CheckBox2 = null;
      this.CheckBox3 = null;
      this.GroupBox1 = null;
      this.OpenDialog1 = null;
      this.RadioButton1 = null;
      this.RadioButton2 = null;
      this.ComboBox2 = null;
      this.Label1 = null;
      this.SaveDialog1 = null;
      this.StaticText1 = null;
      this.ProgressBar1 = null;
      this.StaticText2 = null;
      this.Timer1 = null;
      this.MainMenu1 = null;
      this.MenuItem1 = null;
      this.MenuItem2 = null;
      this.MenuItem3 = null;
      this.MenuItem4 = null;
      this.MenuItem5 = null;
      this.MenuItem6 = null;
      this.MenuItem7 = null;
      this.MenuItem8 = null;
      this.MenuItem9 = null;
      this.MenuItem10 = null;
      this.MenuItem11 = null;
      this.MenuItem12 = null;
      this.MenuItem13 = null;
      this.PopupMenu1 = null;
      this.XPManifest1 = null;
      this.TrackBar1 = null;
    };
    this.$final = function () {
      this.Button1 = undefined;
      this.Button2 = undefined;
      this.Button3 = undefined;
      this.Button4 = undefined;
      this.Button5 = undefined;
      this.Button6 = undefined;
      this.Button7 = undefined;
      this.Button8 = undefined;
      this.Button9 = undefined;
      this.Button10 = undefined;
      this.Button11 = undefined;
      this.Edit1 = undefined;
      this.ComboBox1 = undefined;
      this.ListBox1 = undefined;
      this.Memo1 = undefined;
      this.CheckBox1 = undefined;
      this.CheckBox2 = undefined;
      this.CheckBox3 = undefined;
      this.GroupBox1 = undefined;
      this.OpenDialog1 = undefined;
      this.RadioButton1 = undefined;
      this.RadioButton2 = undefined;
      this.ComboBox2 = undefined;
      this.Label1 = undefined;
      this.SaveDialog1 = undefined;
      this.StaticText1 = undefined;
      this.ProgressBar1 = undefined;
      this.StaticText2 = undefined;
      this.Timer1 = undefined;
      this.MainMenu1 = undefined;
      this.MenuItem1 = undefined;
      this.MenuItem2 = undefined;
      this.MenuItem3 = undefined;
      this.MenuItem4 = undefined;
      this.MenuItem5 = undefined;
      this.MenuItem6 = undefined;
      this.MenuItem7 = undefined;
      this.MenuItem8 = undefined;
      this.MenuItem9 = undefined;
      this.MenuItem10 = undefined;
      this.MenuItem11 = undefined;
      this.MenuItem12 = undefined;
      this.MenuItem13 = undefined;
      this.PopupMenu1 = undefined;
      this.XPManifest1 = undefined;
      this.TrackBar1 = undefined;
      pas.Forms.TForm.$final.call(this);
    };
    this.Button10Click = function (Sender) {
      pas.layui.ShowMessage$1("Impossible: invisible control.");
    };
    this.Button8Click = function (Sender) {
      pas.layui.ShowMessage$1("Impossible: disabled control.");
    };
    this.FormCreate = function (Sender) {
      this.Timer1.SetEnabled(false);
      this.TrackBar1 = pas.layui.TTrackBar.$create("Create$1",[this]);
      var $with = this.TrackBar1;
      $with.SetName("TrackBar1");
      $with.SetLeft(200);
      $with.SetHeight(26);
      $with.SetTop(184);
      $with.SetWidth(200);
      $with.FOnChange = rtl.createCallback(this,"TrackBar1Change");
      $with.SetParent(this);
      $with.SetVisible(true);
      $with.SetTabOrder(this.ListBox1.FTabOrder + 1);
      $mod.Form1.CheckBox1.SetAlignment(pas.Classes.TAlignment.taLeftJustify);
      $mod.Form1.CheckBox3.SetAlignment(pas.Classes.TAlignment.taLeftJustify);
      $mod.Form1.RadioButton2.SetAlignment(pas.Classes.TAlignment.taLeftJustify);
    };
    this.Button1Click = function (Sender) {
      this.ComboBox1.FItems.Add(this.Edit1.GetText());
      this.ListBox1.FItems.Add(this.Edit1.GetText());
      this.ComboBox1.SetText(this.Edit1.GetText());
    };
    this.Button2Click = function (Sender) {
      this.Edit1.SetText(this.ComboBox1.GetText());
    };
    this.Button3Click = function (Sender) {
      this.ComboBox1.FItems.Clear();
      this.ListBox1.Clear();
      this.ComboBox1.SetText("");
    };
    this.Button4Click = function (Sender) {
      this.ComboBox1.SetText(this.Edit1.GetText());
    };
    this.Button5Click = function (Sender) {
      this.Memo1.FLines.Add("Escape\/Cancel");
      if (this.Timer1.FEnabled) {
        this.Timer1.SetEnabled(false);
        this.ProgressBar1.SetPosition(0);
        pas.layui.ShowMessage$1("Timer is now stopped.");
      };
    };
    this.Button6Click = function (Sender) {
      this.CheckBox1.SetState(pas.StdCtrls.TCheckBoxState.cbGrayed);
      this.CheckBox2.SetState(pas.StdCtrls.TCheckBoxState.cbGrayed);
      this.CheckBox3.SetState(pas.StdCtrls.TCheckBoxState.cbGrayed);
    };
    this.Button7Click = function (Sender) {
      this.ComboBox1.DroppedDown = !this.ComboBox1.DroppedDown;
    };
    this.Button9Click = function (Sender) {
      this.Memo1.FLines.Add("Button9Click");
      this.GroupBox1.SetVisible(!this.GroupBox1.FVisible);
    };
    this.Button11Click = function (Sender) {
      this.Memo1.FLines.Add("Return\/Default");
      if (!this.Timer1.FEnabled) {
        this.Timer1.SetEnabled(true);
        pas.layui.ShowMessage$1("Timer is started. See progress bar..." + pas.System.sLineBreak + pas.System.sLineBreak + "Escape (Cancel button) to stop it.");
      };
    };
    this.Edit1Change = function (Sender) {
      this.Memo1.FLines.Add("Edit1: " + this.Edit1.GetText());
    };
    this.Edit1DblClick = function (Sender) {
      this.Memo1.FLines.Add("Edit1DblClick");
    };
    this.ComboBox1Change = function (Sender) {
      this.Memo1.FLines.Add("ComboBox1Change " + pas.SysUtils.IntToStr(this.ComboBox1.FItemIndex));
    };
    this.ListBox1DblClick = function (Sender) {
      this.Memo1.FLines.Add("ListBox1DblClick " + pas.SysUtils.IntToStr(this.ListBox1.FItemIndex));
    };
    this.FormMouseDown = function (Sender, Button, Shift, X, Y) {
      var s = "";
      if (pas.Controls.TShiftStateEnum.ssDouble in Shift) {
        s = " (Double click)"}
       else s = "";
      $impl.MemoAddLineFmt(this.Memo1,"FormMouseDown at %d %d" + s,pas.System.VarRecs(0,X,0,Y));
    };
    this.FormMouseUp = function (Sender, Button, Shift, X, Y) {
      $impl.MemoAddLineFmt(this.Memo1,"FormMouseUp at %d %d",pas.System.VarRecs(0,X,0,Y));
      if (Button === pas.Controls.TMouseButton.mbRight) {
        document.oncontextmenu = rtl.createSafeCallback(this.PopupMenu1,"OnContextMenu");
        this.PopupMenu1.Popup(X,Y);
      };
    };
    this.FormKeyDown = function (Sender, Key, Shift) {
      $impl.MemoAddLineFmt(this.Memo1,"FormKeyDown %d",pas.System.VarRecs(0,Key.get()));
    };
    this.FormKeyUp = function (Sender, Key, Shift) {
      $impl.MemoAddLineFmt(this.Memo1,"FormKeyUp %d",pas.System.VarRecs(0,Key.get()));
    };
    this.FormKeyPress = function (Sender, Key) {
      $impl.MemoAddLineFmt(this.Memo1,"FormKeyPress #%d '%s'",pas.System.VarRecs(0,Key.get().charCodeAt(),9,Key.get()));
    };
    this.Timer1Timer = function (Sender) {
      this.ProgressBar1.StepIt();
      $impl.MemoAddLineFmt(this.Memo1,"Timer Tick: ProgressBar=" + pas.SysUtils.IntToStr(this.ProgressBar1.GetPosition()),{});
    };
    this.TrackBar1Change = function (Sender) {
      $impl.MemoAddLineFmt(this.Memo1,"TrackBar: New value=" + pas.SysUtils.IntToStr(Sender.GetPosition()) + "\/" + pas.SysUtils.IntToStr(Sender.fMax),{});
    };
    this.MenuItem6Click = function (Sender) {
      pas.Forms.Application().Terminate();
    };
    this.MenuItem7Click = function (Sender) {
      this.Memo1.FLines.Add("Menu21");
    };
    this.MenuItem8Click = function (Sender) {
      this.Memo1.FLines.Add("Menu22");
    };
    this.MenuItem9Click = function (Sender) {
      $impl.MemoAddLineFmt(this.Memo1,"Popup1",{});
    };
    this.MenuItem10Click = function (Sender) {
      $impl.MemoAddLineFmt(this.Memo1,"Popup2",{});
    };
    this.MenuItem11Click = function (Sender) {
      var $Self = this;
      this.OpenDialog1.Options = rtl.unionSet(this.OpenDialog1.Options,rtl.createSet(pas.WebCtrlsMore.TOpenOption.ofPathMustExist,pas.WebCtrlsMore.TOpenOption.ofFileMustExist));
      this.OpenDialog1.Filter = "Text files (*.txt)|*.txt|All files|*.*";
      this.OpenDialog1.FilterIndex = 1;
      this.OpenDialog1.Title = "File to open";
      this.OpenDialog1.Execute$1(function () {
        pas.layui.ShowMessage$1("File to open: " + $Self.OpenDialog1.FileName);
      });
    };
    this.MenuItem12Click = function (Sender) {
      this.SaveDialog1.Options = rtl.unionSet(this.SaveDialog1.Options,rtl.createSet(pas.WebCtrlsMore.TOpenOption.ofPathMustExist,pas.WebCtrlsMore.TOpenOption.ofOverwritePrompt));
      this.SaveDialog1.Filter = "Text files (*.txt)|*.txt|Temporary files (*.tmp)|*.tmp|All files|*.*";
      this.SaveDialog1.FilterIndex = 2;
      this.SaveDialog1.FileName = "MyFile.tmp";
      if (this.SaveDialog1.Execute()) pas.layui.ShowMessage$1("File to save: " + this.SaveDialog1.FileName);
    };
    var $r = this.$rtti;
    $r.addField("Button1",pas.layui.$rtti["TButton"]);
    $r.addField("Button2",pas.layui.$rtti["TButton"]);
    $r.addField("Button3",pas.layui.$rtti["TButton"]);
    $r.addField("Button4",pas.layui.$rtti["TButton"]);
    $r.addField("Button5",pas.layui.$rtti["TButton"]);
    $r.addField("Button6",pas.layui.$rtti["TButton"]);
    $r.addField("Button7",pas.layui.$rtti["TButton"]);
    $r.addField("Button8",pas.layui.$rtti["TButton"]);
    $r.addField("Button9",pas.layui.$rtti["TButton"]);
    $r.addField("Button10",pas.layui.$rtti["TButton"]);
    $r.addField("Button11",pas.layui.$rtti["TButton"]);
    $r.addField("Edit1",pas.layui.$rtti["TEdit"]);
    $r.addField("ComboBox1",pas.layui.$rtti["TComboBox"]);
    $r.addField("ListBox1",pas.layui.$rtti["TListBox"]);
    $r.addField("Memo1",pas.layui.$rtti["TMemo"]);
    $r.addField("CheckBox1",pas.layui.$rtti["TCheckbox"]);
    $r.addField("CheckBox2",pas.layui.$rtti["TCheckbox"]);
    $r.addField("CheckBox3",pas.layui.$rtti["TCheckbox"]);
    $r.addField("GroupBox1",pas.WebCtrlsMore.$rtti["TGroupBox"]);
    $r.addField("OpenDialog1",pas.WebCtrlsMore.$rtti["TOpenDialog"]);
    $r.addField("RadioButton1",pas.WebCtrlsMore.$rtti["TRadioButton"]);
    $r.addField("RadioButton2",pas.WebCtrlsMore.$rtti["TRadioButton"]);
    $r.addField("ComboBox2",pas.layui.$rtti["TComboBox"]);
    $r.addField("Label1",pas.layui.$rtti["TLabel"]);
    $r.addField("SaveDialog1",pas.WebCtrlsMore.$rtti["TSaveDialog"]);
    $r.addField("StaticText1",pas.WebCtrlsMore.$rtti["TStaticText"]);
    $r.addField("ProgressBar1",pas.layui.$rtti["TProgressBar"]);
    $r.addField("StaticText2",pas.WebCtrlsMore.$rtti["TStaticText"]);
    $r.addField("Timer1",pas.layui.$rtti["TTimer"]);
    $r.addField("MainMenu1",pas.layui.$rtti["TMainMenu"]);
    $r.addField("MenuItem1",pas.layui.$rtti["TMenuItem"]);
    $r.addField("MenuItem2",pas.layui.$rtti["TMenuItem"]);
    $r.addField("MenuItem3",pas.layui.$rtti["TMenuItem"]);
    $r.addField("MenuItem4",pas.layui.$rtti["TMenuItem"]);
    $r.addField("MenuItem5",pas.layui.$rtti["TMenuItem"]);
    $r.addField("MenuItem6",pas.layui.$rtti["TMenuItem"]);
    $r.addField("MenuItem7",pas.layui.$rtti["TMenuItem"]);
    $r.addField("MenuItem8",pas.layui.$rtti["TMenuItem"]);
    $r.addField("MenuItem9",pas.layui.$rtti["TMenuItem"]);
    $r.addField("MenuItem10",pas.layui.$rtti["TMenuItem"]);
    $r.addField("MenuItem11",pas.layui.$rtti["TMenuItem"]);
    $r.addField("MenuItem12",pas.layui.$rtti["TMenuItem"]);
    $r.addField("MenuItem13",pas.layui.$rtti["TMenuItem"]);
    $r.addField("PopupMenu1",pas.layui.$rtti["TPopupMenu"]);
    $r.addField("XPManifest1",pas.WebCtrlsMore.$rtti["TXPManifest"]);
    $r.addMethod("Button10Click",0,[["Sender",pas.System.$rtti["TObject"]]]);
    $r.addMethod("Button8Click",0,[["Sender",pas.System.$rtti["TObject"]]]);
    $r.addMethod("FormCreate",0,[["Sender",pas.System.$rtti["TObject"]]]);
    $r.addMethod("Button1Click",0,[["Sender",pas.System.$rtti["TObject"]]]);
    $r.addMethod("Button2Click",0,[["Sender",pas.System.$rtti["TObject"]]]);
    $r.addMethod("Button3Click",0,[["Sender",pas.System.$rtti["TObject"]]]);
    $r.addMethod("Button4Click",0,[["Sender",pas.System.$rtti["TObject"]]]);
    $r.addMethod("Button5Click",0,[["Sender",pas.System.$rtti["TObject"]]]);
    $r.addMethod("Button6Click",0,[["Sender",pas.System.$rtti["TObject"]]]);
    $r.addMethod("Button7Click",0,[["Sender",pas.System.$rtti["TObject"]]]);
    $r.addMethod("Button9Click",0,[["Sender",pas.System.$rtti["TObject"]]]);
    $r.addMethod("Button11Click",0,[["Sender",pas.System.$rtti["TObject"]]]);
    $r.addMethod("Edit1Change",0,[["Sender",pas.System.$rtti["TObject"]]]);
    $r.addMethod("Edit1DblClick",0,[["Sender",pas.System.$rtti["TObject"]]]);
    $r.addMethod("ComboBox1Change",0,[["Sender",pas.System.$rtti["TObject"]]]);
    $r.addMethod("ListBox1DblClick",0,[["Sender",pas.System.$rtti["TObject"]]]);
    $r.addMethod("FormMouseDown",0,[["Sender",pas.System.$rtti["TObject"]],["Button",pas.Controls.$rtti["TMouseButton"]],["Shift",pas.Controls.$rtti["TShiftState"]],["X",rtl.longint],["Y",rtl.longint]]);
    $r.addMethod("FormMouseUp",0,[["Sender",pas.System.$rtti["TObject"]],["Button",pas.Controls.$rtti["TMouseButton"]],["Shift",pas.Controls.$rtti["TShiftState"]],["X",rtl.longint],["Y",rtl.longint]]);
    $r.addMethod("FormKeyDown",0,[["Sender",pas.System.$rtti["TObject"]],["Key",rtl.longint,1],["Shift",pas.Controls.$rtti["TShiftState"]]]);
    $r.addMethod("FormKeyUp",0,[["Sender",pas.System.$rtti["TObject"]],["Key",rtl.longint,1],["Shift",pas.Controls.$rtti["TShiftState"]]]);
    $r.addMethod("FormKeyPress",0,[["Sender",pas.System.$rtti["TObject"]],["Key",rtl.char,1]]);
    $r.addMethod("Timer1Timer",0,[["Sender",pas.System.$rtti["TObject"]]]);
    $r.addMethod("TrackBar1Change",0,[["Sender",pas.System.$rtti["TObject"]]]);
    $r.addMethod("MenuItem6Click",0,[["Sender",pas.System.$rtti["TObject"]]]);
    $r.addMethod("MenuItem7Click",0,[["Sender",pas.System.$rtti["TObject"]]]);
    $r.addMethod("MenuItem8Click",0,[["Sender",pas.System.$rtti["TObject"]]]);
    $r.addMethod("MenuItem9Click",0,[["Sender",pas.System.$rtti["TObject"]]]);
    $r.addMethod("MenuItem10Click",0,[["Sender",pas.System.$rtti["TObject"]]]);
    $r.addMethod("MenuItem11Click",0,[["Sender",pas.System.$rtti["TObject"]]]);
    $r.addMethod("MenuItem12Click",0,[["Sender",pas.System.$rtti["TObject"]]]);
  });
  this.Form1 = null;
  $mod.$implcode = function () {
    $impl.MemoAddLineFmt = function (MemoCtrl, s, Args) {
      MemoCtrl.Append(pas.SysUtils.Format(s,Args));
    };
  };
},[]);
rtl.module("unit1frm",["System","SysUtils","Classes","Controls","Forms","Graphics","StdCtrls","TopTypes","layui","WebCtrlsMore"],function () {
  "use strict";
  var $mod = this;
  this.Load_Form1 = function () {
    pas.Unit1.Form1.SetHandleId("form1");
    pas.Unit1.Form1.FFormType = pas.Forms.TFormType.ftTop;
    var $with = pas.Unit1.Form1;
    pas.Unit1.Form1.BeginUpdate();
    pas.Unit1.Form1.SetLeft(245);
    pas.Unit1.Form1.SetHeight(561);
    pas.Unit1.Form1.SetTop(114);
    pas.Unit1.Form1.SetWidth(408);
    pas.Unit1.Form1.SetText("LLCL - Just testing...");
    pas.Unit1.Form1.SetClientHeight(600);
    pas.Unit1.Form1.SetClientWidth(450);
    pas.Unit1.Form1.FFont.SetSize(9);
    pas.Unit1.Form1.FKeyPreview = true;
    pas.Unit1.Form1.FOnCreate = rtl.createCallback($with,"FormCreate");
    pas.Unit1.Form1.FOnKeyDown = rtl.createCallback($with,"FormKeyDown");
    pas.Unit1.Form1.FOnKeyPress = rtl.createCallback($with,"FormKeyPress");
    pas.Unit1.Form1.FOnKeyUp = rtl.createCallback($with,"FormKeyUp");
    pas.Unit1.Form1.FOnMouseDown = rtl.createCallback($with,"FormMouseDown");
    pas.Unit1.Form1.FOnMouseUp = rtl.createCallback($with,"FormMouseUp");
    $with.GroupBox1 = pas.WebCtrlsMore.TGroupBox.$create("Create$1",[pas.Unit1.Form1]);
    $with.GroupBox1.SetName("GroupBox1");
    $with.GroupBox1.BeginUpdate();
    $with.GroupBox1.SetParent(pas.Unit1.Form1);
    $with.GroupBox1.SetLeft(8);
    $with.GroupBox1.SetHeight(65);
    $with.GroupBox1.SetTop(140);
    $with.GroupBox1.SetWidth(129);
    $with.GroupBox1.SetText(" GroupBox1 ");
    $with.GroupBox1.SetColor(pas.Unit1.Form1.FColor);
    $with.GroupBox1.FFont.SetColor(0);
    $with.GroupBox1.FFont.SetName("Tahoma");
    $with.GroupBox1.SetParentFont(false);
    $with.RadioButton1 = pas.WebCtrlsMore.TRadioButton.$create("Create$1",[$with.GroupBox1]);
    $with.RadioButton1.BeginUpdate();
    $with.RadioButton1.SetParent($with.GroupBox1);
    $with.RadioButton1.SetLeft(10);
    $with.RadioButton1.SetHeight(21);
    $with.RadioButton1.SetTop(13);
    $with.RadioButton1.SetWidth(110);
    $with.RadioButton1.SetText("RadioButton1");
    $with.RadioButton1.FFont.SetColor(0);
    $with.RadioButton1.FFont.SetName("Tahoma");
    $with.RadioButton1.FFont.SetStyle(rtl.createSet(pas.Graphics.TFontStyle.fsItalic));
    $with.RadioButton1.SetParentFont(false);
    $with.RadioButton1.EndUpdate();
    $with.RadioButton2 = pas.WebCtrlsMore.TRadioButton.$create("Create$1",[$with.GroupBox1]);
    $with.RadioButton2.BeginUpdate();
    $with.RadioButton2.SetParent($with.GroupBox1);
    $with.RadioButton2.SetLeft(10);
    $with.RadioButton2.SetHeight(21);
    $with.RadioButton2.SetTop(32);
    $with.RadioButton2.SetWidth(110);
    $with.RadioButton2.SetText("RadioButton2");
    $with.RadioButton2.SetChecked(true);
    $with.RadioButton2.FFont.SetColor(0);
    $with.RadioButton2.FFont.SetName("Tahoma");
    $with.RadioButton2.SetParentFont(false);
    $with.RadioButton2.EndUpdate();
    $with.GroupBox1.EndUpdate();
    $with.ComboBox1 = pas.layui.TComboBox.$create("Create$1",[pas.Unit1.Form1]);
    $with.ComboBox1.BeginUpdate();
    $with.ComboBox1.SetParent(pas.Unit1.Form1);
    $with.ComboBox1.SetLeft(8);
    $with.ComboBox1.SetHeight(21);
    $with.ComboBox1.SetTop(12);
    $with.ComboBox1.SetWidth(133);
    $with.ComboBox1.FFont.SetColor(0);
    $with.ComboBox1.FFont.SetName("Tahoma");
    $with.ComboBox1.FFont.SetStyle(rtl.createSet(pas.Graphics.TFontStyle.fsBold));
    $with.ComboBox1.SetItemHeight(13);
    $with.ComboBox1.FItems.SetCommaText("11,22,44,33");
    $with.ComboBox1.SetItemIndex(0);
    $with.ComboBox1.FOnChange = rtl.createCallback($with,"ComboBox1Change");
    $with.ComboBox1.SetParentFont(false);
    $with.ComboBox1.SetText("sample text");
    $with.ComboBox1.EndUpdate();
    $with.Edit1 = pas.layui.TEdit.$create("Create$1",[pas.Unit1.Form1]);
    $with.Edit1.BeginUpdate();
    $with.Edit1.SetParent(pas.Unit1.Form1);
    $with.Edit1.SetLeft(276);
    $with.Edit1.SetHeight(16);
    $with.Edit1.SetTop(12);
    $with.Edit1.SetWidth(125);
    $with.Edit1.FOnChange = rtl.createCallback($with,"Edit1Change");
    $with.Edit1.FOnDblClick = rtl.createCallback($with,"Edit1DblClick");
    $with.Edit1.SetText("New item name");
    $with.Edit1.EndUpdate();
    $with.Button1 = pas.layui.TButton.$create("Create$1",[pas.Unit1.Form1]);
    $with.Button1.BeginUpdate();
    $with.Button1.SetParent(pas.Unit1.Form1);
    $with.Button1.SetLeft(184);
    $with.Button1.SetHeight(25);
    $with.Button1.SetTop(12);
    $with.Button1.SetWidth(75);
    $with.Button1.SetText("Add");
    $with.Button1.FFont.SetColor(0);
    $with.Button1.FFont.SetHeight(-10);
    $with.Button1.FFont.SetName("Tahoma");
    $with.Button1.FFont.SetStyle(rtl.createSet(pas.Graphics.TFontStyle.fsBold));
    $with.Button1.FOnClick = rtl.createCallback($with,"Button1Click");
    $with.Button1.SetParentFont(false);
    $with.Button1.EndUpdate();
    $with.Button3 = pas.layui.TButton.$create("Create$1",[pas.Unit1.Form1]);
    $with.Button3.BeginUpdate();
    $with.Button3.SetParent(pas.Unit1.Form1);
    $with.Button3.SetLeft(184);
    $with.Button3.SetHeight(25);
    $with.Button3.SetTop(44);
    $with.Button3.SetWidth(75);
    $with.Button3.SetText("Clear");
    $with.Button3.FOnClick = rtl.createCallback($with,"Button3Click");
    $with.Button3.EndUpdate();
    $with.ListBox1 = pas.layui.TListBox.$create("Create$1",[pas.Unit1.Form1]);
    $with.ListBox1.BeginUpdate();
    $with.ListBox1.SetParent(pas.Unit1.Form1);
    $with.ListBox1.SetLeft(184);
    $with.ListBox1.SetHeight(100);
    $with.ListBox1.SetTop(76);
    $with.ListBox1.SetWidth(217);
    $with.ListBox1.FFont.SetColor(0);
    $with.ListBox1.FFont.SetHeight(-10);
    $with.ListBox1.FFont.SetName("Tahoma");
    $with.ListBox1.FFont.SetStyle(rtl.createSet(pas.Graphics.TFontStyle.fsBold));
    $with.ListBox1.FItems.SetCommaText("444,111,333,222");
    $with.ListBox1.SetItemHeight(13);
    $with.ListBox1.FOnDblClick = rtl.createCallback($with,"ListBox1DblClick");
    $with.ListBox1.SetParentFont(false);
    $with.ListBox1.EndUpdate();
    $with.Memo1 = pas.layui.TMemo.$create("Create$1",[pas.Unit1.Form1]);
    $with.Memo1.BeginUpdate();
    $with.Memo1.SetParent(pas.Unit1.Form1);
    $with.Memo1.SetLeft(8);
    $with.Memo1.SetHeight(285);
    $with.Memo1.SetTop(216);
    $with.Memo1.SetWidth(393);
    $with.Memo1.FLines.SetCommaText("asd,zxc");
    $with.Memo1.EndUpdate();
    $with.Button2 = pas.layui.TButton.$create("Create$1",[pas.Unit1.Form1]);
    $with.Button2.BeginUpdate();
    $with.Button2.SetParent(pas.Unit1.Form1);
    $with.Button2.SetLeft(276);
    $with.Button2.SetHeight(25);
    $with.Button2.SetTop(44);
    $with.Button2.SetWidth(53);
    $with.Button2.SetText("GetText");
    $with.Button2.FOnClick = rtl.createCallback($with,"Button2Click");
    $with.Button2.EndUpdate();
    $with.Button4 = pas.layui.TButton.$create("Create$1",[pas.Unit1.Form1]);
    $with.Button4.BeginUpdate();
    $with.Button4.SetParent(pas.Unit1.Form1);
    $with.Button4.SetLeft(348);
    $with.Button4.SetHeight(25);
    $with.Button4.SetTop(44);
    $with.Button4.SetWidth(53);
    $with.Button4.SetText("SetText");
    $with.Button4.FOnClick = rtl.createCallback($with,"Button4Click");
    $with.Button4.EndUpdate();
    $with.CheckBox1 = pas.layui.TCheckbox.$create("Create$1",[pas.Unit1.Form1]);
    $with.CheckBox1.BeginUpdate();
    $with.CheckBox1.SetParent(pas.Unit1.Form1);
    $with.CheckBox1.SetLeft(8);
    $with.CheckBox1.SetHeight(21);
    $with.CheckBox1.SetTop(76);
    $with.CheckBox1.SetWidth(100);
    $with.CheckBox1.FAllowGrayed = true;
    $with.CheckBox1.SetText("CheckBox1");
    $with.CheckBox1.SetState(pas.StdCtrls.TCheckBoxState.cbGrayed);
    $with.CheckBox1.EndUpdate();
    $with.Button6 = pas.layui.TButton.$create("Create$1",[pas.Unit1.Form1]);
    $with.Button6.BeginUpdate();
    $with.Button6.SetParent(pas.Unit1.Form1);
    $with.Button6.SetLeft(95);
    $with.Button6.SetHeight(25);
    $with.Button6.SetTop(92);
    $with.Button6.SetWidth(50);
    $with.Button6.SetText("Grayed");
    $with.Button6.FOnClick = rtl.createCallback($with,"Button6Click");
    $with.Button6.EndUpdate();
    $with.Button7 = pas.layui.TButton.$create("Create$1",[pas.Unit1.Form1]);
    $with.Button7.BeginUpdate();
    $with.Button7.SetParent(pas.Unit1.Form1);
    $with.Button7.SetLeft(140);
    $with.Button7.SetHeight(25);
    $with.Button7.SetTop(12);
    $with.Button7.SetWidth(29);
    $with.Button7.SetText("DD");
    $with.Button7.FOnClick = rtl.createCallback($with,"Button7Click");
    $with.Button7.EndUpdate();
    $with.Button8 = pas.layui.TButton.$create("Create$1",[pas.Unit1.Form1]);
    $with.Button8.BeginUpdate();
    $with.Button8.SetParent(pas.Unit1.Form1);
    $with.Button8.SetLeft(80);
    $with.Button8.SetHeight(21);
    $with.Button8.SetTop(60);
    $with.Button8.SetWidth(55);
    $with.Button8.SetText("Disabled");
    $with.Button8.SetEnabled(false);
    $with.Button8.FOnClick = rtl.createCallback($with,"Button8Click");
    $with.Button8.EndUpdate();
    $with.Button9 = pas.layui.TButton.$create("Create$1",[pas.Unit1.Form1]);
    $with.Button9.BeginUpdate();
    $with.Button9.SetParent(pas.Unit1.Form1);
    $with.Button9.SetLeft(140);
    $with.Button9.SetHeight(25);
    $with.Button9.SetTop(180);
    $with.Button9.SetWidth(33);
    $with.Button9.SetText("Sh\/H");
    $with.Button9.FOnClick = rtl.createCallback($with,"Button9Click");
    $with.Button9.EndUpdate();
    $with.Button10 = pas.layui.TButton.$create("Create$1",[pas.Unit1.Form1]);
    $with.Button10.BeginUpdate();
    $with.Button10.SetParent(pas.Unit1.Form1);
    $with.Button10.SetLeft(8);
    $with.Button10.SetHeight(21);
    $with.Button10.SetTop(44);
    $with.Button10.SetWidth(69);
    $with.Button10.SetText("Invisible!!!");
    $with.Button10.FOnClick = rtl.createCallback($with,"Button10Click");
    $with.Button10.SetVisible(false);
    $with.Button10.EndUpdate();
    $with.CheckBox2 = pas.layui.TCheckbox.$create("Create$1",[pas.Unit1.Form1]);
    $with.CheckBox2.BeginUpdate();
    $with.CheckBox2.SetParent(pas.Unit1.Form1);
    $with.CheckBox2.SetLeft(8);
    $with.CheckBox2.SetHeight(21);
    $with.CheckBox2.SetTop(96);
    $with.CheckBox2.SetWidth(100);
    $with.CheckBox2.SetText("CheckBox2");
    $with.CheckBox2.SetChecked(true);
    $with.CheckBox2.SetState(pas.StdCtrls.TCheckBoxState.cbChecked);
    $with.CheckBox2.EndUpdate();
    $with.CheckBox3 = pas.layui.TCheckbox.$create("Create$1",[pas.Unit1.Form1]);
    $with.CheckBox3.BeginUpdate();
    $with.CheckBox3.SetParent(pas.Unit1.Form1);
    $with.CheckBox3.SetLeft(8);
    $with.CheckBox3.SetHeight(21);
    $with.CheckBox3.SetTop(116);
    $with.CheckBox3.SetWidth(100);
    $with.CheckBox3.SetText("CheckBox3");
    $with.CheckBox3.EndUpdate();
    $with.ComboBox2 = pas.layui.TComboBox.$create("Create$1",[pas.Unit1.Form1]);
    $with.ComboBox2.BeginUpdate();
    $with.ComboBox2.SetParent(pas.Unit1.Form1);
    $with.ComboBox2.SetLeft(148);
    $with.ComboBox2.SetHeight(129);
    $with.ComboBox2.SetTop(44);
    $with.ComboBox2.SetWidth(25);
    $with.ComboBox2.SetItemHeight(17);
    $with.ComboBox2.FItems.SetCommaText("5,4,3,2,1");
    $with.ComboBox2.fStyle = pas.StdCtrls.TComboBoxStyle.csSimple;
    $with.ComboBox2.SetText("10");
    $with.ComboBox2.EndUpdate();
    $with.StaticText1 = pas.WebCtrlsMore.TStaticText.$create("Create$1",[pas.Unit1.Form1]);
    $with.StaticText1.BeginUpdate();
    $with.StaticText1.SetParent(pas.Unit1.Form1);
    $with.StaticText1.SetLeft(44);
    $with.StaticText1.SetHeight(18);
    $with.StaticText1.SetTop(512);
    $with.StaticText1.SetWidth(70);
    $with.StaticText1.SetAlignment(pas.Classes.TAlignment.taCenter);
    $with.StaticText1.BorderStyle = pas.TopTypes.TStaticBorderStyle.sbsSunken;
    $with.StaticText1.SetText("StaticText");
    $with.StaticText1.EndUpdate();
    $with.Label1 = pas.layui.TLabel.$create("Create$1",[pas.Unit1.Form1]);
    $with.Label1.BeginUpdate();
    $with.Label1.SetParent(pas.Unit1.Form1);
    $with.Label1.SetLeft(8);
    $with.Label1.SetHeight(17);
    $with.Label1.SetTop(512);
    $with.Label1.SetWidth(31);
    $with.Label1.SetText("Label");
    $with.Label1.SetParentColor(false);
    $with.Label1.EndUpdate();
    $with.Button5 = pas.layui.TButton.$create("Create$1",[pas.Unit1.Form1]);
    $with.Button5.BeginUpdate();
    $with.Button5.SetParent(pas.Unit1.Form1);
    $with.Button5.SetLeft(120);
    $with.Button5.SetHeight(25);
    $with.Button5.SetTop(512);
    $with.Button5.SetWidth(90);
    $with.Button5.SetCancel(true);
    $with.Button5.SetText("Cancel Button");
    $with.Button5.FOnClick = rtl.createCallback($with,"Button5Click");
    $with.Button5.EndUpdate();
    $with.Button11 = pas.layui.TButton.$create("Create$1",[pas.Unit1.Form1]);
    $with.Button11.BeginUpdate();
    $with.Button11.SetParent(pas.Unit1.Form1);
    $with.Button11.SetLeft(216);
    $with.Button11.SetHeight(25);
    $with.Button11.SetTop(512);
    $with.Button11.SetWidth(90);
    $with.Button11.SetText("Default Button");
    $with.Button11.SetDefault(true);
    $with.Button11.FOnClick = rtl.createCallback($with,"Button11Click");
    $with.Button11.EndUpdate();
    $with.ProgressBar1 = pas.layui.TProgressBar.$create("Create$1",[pas.Unit1.Form1]);
    $with.ProgressBar1.BeginUpdate();
    $with.ProgressBar1.SetParent(pas.Unit1.Form1);
    $with.ProgressBar1.SetPosition(30);
    $with.ProgressBar1.SetLeft(320);
    $with.ProgressBar1.SetHeight(16);
    $with.ProgressBar1.SetTop(516);
    $with.ProgressBar1.SetWidth(81);
    $with.ProgressBar1.EndUpdate();
    $with.StaticText2 = pas.WebCtrlsMore.TStaticText.$create("Create$1",[pas.Unit1.Form1]);
    $with.StaticText2.BeginUpdate();
    $with.StaticText2.SetParent(pas.Unit1.Form1);
    $with.StaticText2.SetLeft(184);
    $with.StaticText2.SetHeight(17);
    $with.StaticText2.SetTop(184);
    $with.StaticText2.SetWidth(217);
    $with.StaticText2.SetAlignment(pas.Classes.TAlignment.taCenter);
    $with.StaticText2.SetText("(Reserved for dynamic control)");
    $with.StaticText2.SetVisible(false);
    $with.StaticText2.EndUpdate();
    $with.Timer1 = pas.layui.TTimer.$create("Create$1",[pas.Unit1.Form1]);
    $with.Timer1.SetInterval(1000);
    $with.Timer1.SetOnTimer(rtl.createCallback($with,"Timer1Timer"));
    $with.MainMenu1 = pas.layui.TMainMenu.$create("Create$1",[pas.Unit1.Form1]);
    $with.MainMenu1.BeginUpdate();
    $with.MainMenu1.SetParent(pas.Unit1.Form1);
    $with.MenuItem1 = pas.layui.TMenuItem.$create("Create$1",[$with.MainMenu1]);
    $with.MenuItem1.BeginUpdate();
    $with.MenuItem1.SetParent($with.MainMenu1);
    $with.MenuItem1.SetText("Menu1");
    $with.MenuItem3 = pas.layui.TMenuItem.$create("Create$1",[$with.MenuItem1]);
    $with.MenuItem3.BeginUpdate();
    $with.MenuItem3.SetParent($with.MenuItem1);
    $with.MenuItem3.AutoCheck = true;
    $with.MenuItem3.SetText("Menu11");
    $with.MenuItem3.Checked = true;
    $with.MenuItem3.EndUpdate();
    $with.MenuItem4 = pas.layui.TMenuItem.$create("Create$1",[$with.MenuItem1]);
    $with.MenuItem4.BeginUpdate();
    $with.MenuItem4.SetParent($with.MenuItem1);
    $with.MenuItem4.SetText("Menu12");
    $with.MenuItem4.SetEnabled(false);
    $with.MenuItem4.EndUpdate();
    $with.MenuItem13 = pas.layui.TMenuItem.$create("Create$1",[$with.MenuItem1]);
    $with.MenuItem13.BeginUpdate();
    $with.MenuItem13.SetParent($with.MenuItem1);
    $with.MenuItem13.SetText("-");
    $with.MenuItem13.EndUpdate();
    $with.MenuItem11 = pas.layui.TMenuItem.$create("Create$1",[$with.MenuItem1]);
    $with.MenuItem11.BeginUpdate();
    $with.MenuItem11.SetParent($with.MenuItem1);
    $with.MenuItem11.SetText("Open File...");
    $with.MenuItem11.FOnClick = rtl.createCallback($with,"MenuItem11Click");
    $with.MenuItem11.EndUpdate();
    $with.MenuItem12 = pas.layui.TMenuItem.$create("Create$1",[$with.MenuItem1]);
    $with.MenuItem12.BeginUpdate();
    $with.MenuItem12.SetParent($with.MenuItem1);
    $with.MenuItem12.SetText("Save File...");
    $with.MenuItem12.FOnClick = rtl.createCallback($with,"MenuItem12Click");
    $with.MenuItem12.EndUpdate();
    $with.MenuItem5 = pas.layui.TMenuItem.$create("Create$1",[$with.MenuItem1]);
    $with.MenuItem5.BeginUpdate();
    $with.MenuItem5.SetParent($with.MenuItem1);
    $with.MenuItem5.SetText("-");
    $with.MenuItem5.EndUpdate();
    $with.MenuItem6 = pas.layui.TMenuItem.$create("Create$1",[$with.MenuItem1]);
    $with.MenuItem6.BeginUpdate();
    $with.MenuItem6.SetParent($with.MenuItem1);
    $with.MenuItem6.SetText("Quit");
    $with.MenuItem6.FOnClick = rtl.createCallback($with,"MenuItem6Click");
    $with.MenuItem6.EndUpdate();
    $with.MenuItem1.EndUpdate();
    $with.MenuItem2 = pas.layui.TMenuItem.$create("Create$1",[$with.MainMenu1]);
    $with.MenuItem2.BeginUpdate();
    $with.MenuItem2.SetParent($with.MainMenu1);
    $with.MenuItem2.SetText("Menu2");
    $with.MenuItem7 = pas.layui.TMenuItem.$create("Create$1",[$with.MenuItem2]);
    $with.MenuItem7.BeginUpdate();
    $with.MenuItem7.SetParent($with.MenuItem2);
    $with.MenuItem7.SetText("Menu21");
    $with.MenuItem7.FOnClick = rtl.createCallback($with,"MenuItem7Click");
    $with.MenuItem7.EndUpdate();
    $with.MenuItem8 = pas.layui.TMenuItem.$create("Create$1",[$with.MenuItem2]);
    $with.MenuItem8.BeginUpdate();
    $with.MenuItem8.SetParent($with.MenuItem2);
    $with.MenuItem8.SetText("Menu22");
    $with.MenuItem8.FOnClick = rtl.createCallback($with,"MenuItem8Click");
    $with.MenuItem8.EndUpdate();
    $with.MenuItem2.EndUpdate();
    $with.MainMenu1.EndUpdate();
    $with.PopupMenu1 = pas.layui.TPopupMenu.$create("Create$1",[pas.Unit1.Form1]);
    $with.PopupMenu1.BeginUpdate();
    $with.PopupMenu1.SetParent(pas.Unit1.Form1);
    $with.PopupMenu1.SetLeft(304);
    $with.MenuItem9 = pas.layui.TMenuItem.$create("Create$1",[$with.PopupMenu1]);
    $with.MenuItem9.BeginUpdate();
    $with.MenuItem9.SetParent($with.PopupMenu1);
    $with.MenuItem9.SetText("Popup1");
    $with.MenuItem9.FOnClick = rtl.createCallback($with,"MenuItem9Click");
    $with.MenuItem9.EndUpdate();
    $with.MenuItem10 = pas.layui.TMenuItem.$create("Create$1",[$with.PopupMenu1]);
    $with.MenuItem10.BeginUpdate();
    $with.MenuItem10.SetParent($with.PopupMenu1);
    $with.MenuItem10.SetText("Popup2");
    $with.MenuItem10.FOnClick = rtl.createCallback($with,"MenuItem10Click");
    $with.MenuItem10.EndUpdate();
    $with.PopupMenu1.EndUpdate();
    $with.OpenDialog1 = pas.WebCtrlsMore.TOpenDialog.$create("Create$1",[pas.Unit1.Form1]);
    $with.SaveDialog1 = pas.WebCtrlsMore.TSaveDialog.$create("Create$1",[pas.Unit1.Form1]);
    pas.Unit1.Form1.EndUpdate();
    pas.Unit1.Form1.FormCreate(null);
    pas.Unit1.Form1.Show();
  };
},["Unit1"]);


 