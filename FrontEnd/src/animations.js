window.OnlineWebFonts_Animations =
  window.OnlineWebFonts_Animations ||
  function (t) {
    return "object" != typeof t
      ? this
      : {
          Config: {},
          Index: {
            Key: "www.onlinewebfonts.com",
            Id: null,
            Data: {
              Config: {
                Width: 3,
                Opacity: 1,
                StrokeDot: !0,
                Sequential: !0,
                Display: !0,
                Reverse: !1,
                Color: "#000000",
                Animate: "Linear",
              },
            },
            Svg: {},
            Path: [],
            Div: null,
            An: null,
            Dom: null,
            Pause: !1,
            Complete: null,
            Status: null,
          },
          Run: function (t) {
            this.Config = this.Index;
            var n = this.Config,
              e = n.Data;
            for (var i in e.Config)
              null != t.Data.Config[i] && (e.Config[i] = t.Data.Config[i]);
            return (
              (n.Id = t.Id),
              (n.Data.Line = t.Data.Line),
              (n.Data.Box = t.Data.Box),
              "function" == typeof t.Complete && (n.Complete = t.Complete),
              "function" == typeof t.Status && (n.Status = t.Status),
              this.Append().PathAppend(),
              this
            );
          },
          Play: function () {
            var t = this;
            return (
              t.Stop(),
              (t.Config.An = requestAnimationFrame(function (n) {
                t.Update(n);
              })),
              this
            );
          },
          Pause: function () {
            return (
              this.Config.Pause ||
                ((this.Config.Pause = !0),
                cancelAnimationFrame(this.Config.An)),
              this
            );
          },
          Resume: function () {
            var t = this;
            return (
              t.Config.Pause &&
                ((t.Config.Pause = !1),
                requestAnimationFrame(function (n) {
                  t.ResumeUpdate(n);
                })),
              this
            );
          },
          Stop: function () {
            return (
              (this.Config.Div.innerHTML = ""),
              this.Append().PathAppend(),
              cancelAnimationFrame(this.Config.An),
              this
            );
          },
          ResumeUpdate: function (t) {
            var n = this,
              e = n.Config.Svg.Time.Data;
            (e.Start = t - e.Elapsed),
              requestAnimationFrame(function (t) {
                n.Update(t);
              });
          },
          Update: function (t) {
            var n = this,
              e = n.Config,
              i = e.Data,
              r = e.Svg.Time.Data;
            if (
              (0 == r.Start && (r.Start = t),
              (r.Elapsed = t - r.Start),
              (r.Progress = n.Progress(
                r.Total,
                r.Start,
                r.Elapsed,
                i.Config.Animate
              )),
              n.UpdatePath(),
              r.Progress < 1)
            ) {
              if (null !== e.Status) {
                var a = Math.round(100 * r.Progress);
                e.Status(99 == a ? 100 : a, e.Id);
              }
              n.Config.An = requestAnimationFrame(function (t) {
                n.Update(t);
              });
            } else null !== e.Complete && e.Complete();
          },
          UpdatePath: function () {
            for (
              var t = this.Config.Svg.Time.Path, n = 0;
              n < this.Config.Dom.length;
              n++
            ) {
              var e = this.PathElapsed(n);
              (t[n].Progress = this.Progress(
                1,
                0,
                e,
                this.Config.Data.Config.Animate
              )),
                this.SetLine(n);
            }
          },
          SetLine: function (t) {
            var n = this.Config.Svg,
              e = n.Time.Path,
              i = this.Config.Dom,
              r = e[t].Progress * n.Path.Length[t];
            if (this.Config.Data.Config.Reverse) var a = -n.Path.Length[t] + r;
            else a = n.Path.Length[t] - r;
            i[t].style.strokeDashoffset = a;
          },
          PathElapsed: function (t) {
            var n,
              e = this.Config.Svg.Time,
              i = e.Path[t];
            return (
              e.Data.Progress > i.StartPro &&
              e.Data.Progress < i.StartPro + i.Duration
                ? (n = (e.Data.Progress - i.StartPro) / i.Duration)
                : e.Data.Progress >= i.StartPro + i.Duration
                ? (n = 1)
                : e.Data.Progress <= i.StartPro && (n = 0),
              n
            );
          },
          Progress: function (t, n, e, i) {
            var r;
            return (
              e > 0 && e < t
                ? (r = i ? this.Ease[i](e, 0, 1, t) : e / t)
                : e >= t
                ? (r = 1)
                : e <= n && (r = 0),
              r
            );
          },
          PathAppend: function () {
            var t = this.Config,
              n = t.Data,
              e = t.Svg.Time;
            e.Path = [];
            var i = n.Config.Reverse ? e.Data.Total : 0;
            for (var r in n.Line) {
              var a = parseInt(n.Line[r].Duration),
                o = a / e.Data.Total;
              n.Config.Reverse
                ? (i -= a)
                : (i = n.Config.Sequential ? e.Data.Delay : 0);
              var u = i / e.Data.Total;
              (e.Data.Delay += a),
                (e.Path[r] = { Start: i, Duration: o, StartPro: u });
            }
          },
          Append: function () {
            var t = this.Config,
              n = t.Data,
              e = t.Svg,
              i = this.SVGElement();
            (e.Path = {}),
              (e.Time = {}),
              (e.Time.Data = {
                Start: 0,
                Elapsed: 0,
                Total: 0,
                Duration: 0,
                Progress: 0,
                Delay: 0,
              }),
              (e.Path.Length = []);
            var r = 0;
            for (var a in n.Line) {
              var o = {
                  "fill-opacity": "0",
                  "stroke-linecap": n.Config.StrokeDot ? "round" : "butt",
                  "stroke-linejoin": "round",
                  stroke: n.Line[a].Color ? n.Line[a].Color : n.Config.Color,
                  "stroke-opacity": n.Config.StrokeDot ? n.Config.Opacity : "0",
                  "stroke-width": n.Line[a].Width
                    ? n.Line[a].Width
                    : n.Config.Width,
                  d: n.Line[a].Path,
                },
                u = document.createElementNS(
                  "http://www.w3.org/2000/svg",
                  "path"
                );
              for (var s in o) u.setAttribute(s, o[s]);
              var f = Math.ceil(u.getTotalLength());
              (e.Path.Length[a] = f),
                u.setAttribute(
                  "style",
                  "stroke-dasharray:" +
                    f +
                    "," +
                    f +
                    ";stroke-dashoffset:" +
                    (n.Config.Display ? "0" : f) +
                    ";"
                ),
                i.appendChild(u),
                t.Path.push(u),
                0 == n.Line[a].Duration &&
                  (n.Line[a].Duration = this.GetPathDuration(n.Line[a].Path)),
                n.Config.Sequential
                  ? (r += parseInt(n.Line[a].Duration))
                  : parseInt(n.Line[a].Duration) > r &&
                    (r = parseInt(n.Line[a].Duration));
            }
            return (
              (e.Time.Data.Total = r),
              (t.Div = document.querySelector(t.Id)),
              t.Div.appendChild(i),
              (t.Dom = t.Div.children[0].childNodes),
              this
            );
          },
          GetPathDuration: function (t) {
            var n = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "path"
            );
            return n.setAttribute("d", t), Math.ceil(n.getTotalLength());
          },
          SVGElement: function (t) {
            var n = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "svg"
            );
            n.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            var e = this.Config.Data.Box.Width,
              i = this.Config.Data.Box.Height;
            return n.setAttribute("viewBox", "0 0 " + e + " " + i), n;
          },
          Ease: {
            Linear: function (t, n, e, i) {
              return (e * t) / i + n;
            },
            InQuad: function (t, n, e, i) {
              return e * (t /= i) * t + n;
            },
            OutQuad: function (t, n, e, i) {
              return -e * (t /= i) * (t - 2) + n;
            },
            InOutQuad: function (t, n, e, i) {
              return (t /= i / 2) < 1
                ? (e / 2) * t * t + n
                : (-e / 2) * (--t * (t - 2) - 1) + n;
            },
            InCubic: function (t, n, e, i) {
              return e * (t /= i) * t * t + n;
            },
            OutCubic: function (t, n, e, i) {
              return e * ((t = t / i - 1) * t * t + 1) + n;
            },
            InOutCubic: function (t, n, e, i) {
              return (t /= i / 2) < 1
                ? (e / 2) * t * t * t + n
                : (e / 2) * ((t -= 2) * t * t + 2) + n;
            },
            InQuart: function (t, n, e, i) {
              return e * (t /= i) * t * t * t + n;
            },
            OutQuart: function (t, n, e, i) {
              return -e * ((t = t / i - 1) * t * t * t - 1) + n;
            },
            InOutQuart: function (t, n, e, i) {
              return (t /= i / 2) < 1
                ? (e / 2) * t * t * t * t + n
                : (-e / 2) * ((t -= 2) * t * t * t - 2) + n;
            },
            InQuint: function (t, n, e, i) {
              return e * (t /= i) * t * t * t * t + n;
            },
            OutQuint: function (t, n, e, i) {
              return e * ((t = t / i - 1) * t * t * t * t + 1) + n;
            },
            InOutQuint: function (t, n, e, i) {
              return (t /= i / 2) < 1
                ? (e / 2) * t * t * t * t * t + n
                : (e / 2) * ((t -= 2) * t * t * t * t + 2) + n;
            },
            InSine: function (t, n, e, i) {
              return -e * Math.cos((t / i) * (Math.PI / 2)) + e + n;
            },
            OutSine: function (t, n, e, i) {
              return e * Math.sin((t / i) * (Math.PI / 2)) + n;
            },
            InOutSine: function (t, n, e, i) {
              return (-e / 2) * (Math.cos((Math.PI * t) / i) - 1) + n;
            },
            InExpo: function (t, n, e, i) {
              return 0 == t ? n : e * Math.pow(2, 10 * (t / i - 1)) + n;
            },
            OutExpo: function (t, n, e, i) {
              return t == i ? n + e : e * (1 - Math.pow(2, (-10 * t) / i)) + n;
            },
            InOutExpo: function (t, n, e, i) {
              return 0 == t
                ? n
                : t == i
                ? n + e
                : (t /= i / 2) < 1
                ? (e / 2) * Math.pow(2, 10 * (t - 1)) + n
                : (e / 2) * (2 - Math.pow(2, -10 * --t)) + n;
            },
            InCirc: function (t, n, e, i) {
              return -e * (Math.sqrt(1 - (t /= i) * t) - 1) + n;
            },
            OutCirc: function (t, n, e, i) {
              return e * Math.sqrt(1 - (t = t / i - 1) * t) + n;
            },
            InOutCirc: function (t, n, e, i) {
              return (t /= i / 2) < 1
                ? (-e / 2) * (Math.sqrt(1 - t * t) - 1) + n
                : (e / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + n;
            },
            InElastic: function (t, n, e, i) {
              var r = 1.70158,
                a = 0,
                o = e;
              if (0 == t) return n;
              if (1 == (t /= i)) return n + e;
              if ((a || (a = 0.3 * i), o < Math.abs(e))) {
                o = e;
                r = a / 4;
              } else r = (a / (2 * Math.PI)) * Math.asin(e / o);
              return (
                -o *
                  Math.pow(2, 10 * (t -= 1)) *
                  Math.sin(((t * i - r) * (2 * Math.PI)) / a) +
                n
              );
            },
            OutElastic: function (t, n, e, i) {
              var r = 1.70158,
                a = 0,
                o = e;
              if (0 == t) return n;
              if (1 == (t /= i)) return n + e;
              if ((a || (a = 0.3 * i), o < Math.abs(e))) {
                o = e;
                r = a / 4;
              } else r = (a / (2 * Math.PI)) * Math.asin(e / o);
              return (
                o *
                  Math.pow(2, -10 * t) *
                  Math.sin(((t * i - r) * (2 * Math.PI)) / a) +
                e +
                n
              );
            },
            InOutElastic: function (t, n, e, i) {
              var r = 1.70158,
                a = 0,
                o = e;
              if (0 == t) return n;
              if (2 == (t /= i / 2)) return n + e;
              if ((a || (a = i * (0.3 * 1.5)), o < Math.abs(e))) {
                o = e;
                r = a / 4;
              } else r = (a / (2 * Math.PI)) * Math.asin(e / o);
              return t < 1
                ? o *
                    Math.pow(2, 10 * (t -= 1)) *
                    Math.sin(((t * i - r) * (2 * Math.PI)) / a) *
                    -0.5 +
                    n
                : o *
                    Math.pow(2, -10 * (t -= 1)) *
                    Math.sin(((t * i - r) * (2 * Math.PI)) / a) *
                    0.5 +
                    e +
                    n;
            },
            InBack: function (t, n, e, i, r) {
              return (
                null == r && (r = 1.70158),
                e * (t /= i) * t * ((r + 1) * t - r) + n
              );
            },
            OutBack: function (t, n, e, i, r) {
              return (
                null == r && (r = 1.70158),
                e * ((t = t / i - 1) * t * ((r + 1) * t + r) + 1) + n
              );
            },
            InOutBack: function (t, n, e, i, r) {
              return (
                null == r && (r = 1.70158),
                (t /= i / 2) < 1
                  ? (e / 2) * (t * t * ((1 + (r *= 1.525)) * t - r)) + n
                  : (e / 2) *
                      ((t -= 2) * t * ((1 + (r *= 1.525)) * t + r) + 2) +
                    n
              );
            },
            InBounce: function (t, n, e, i) {
              return e - this.OutBounce(i - t, 0, e, i) + n;
            },
            OutBounce: function (t, n, e, i) {
              return (t /= i) < 1 / 2.75
                ? e * (7.5625 * t * t) + n
                : t < 2 / 2.75
                ? e * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + n
                : t < 2.5 / 2.75
                ? e * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + n
                : e * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + n;
            },
            InOutBounce: function (t, n, e, i) {
              return t < i / 2
                ? 0.5 * this.InBounce(2 * t, 0, e, i) + n
                : 0.5 * this.OutBounce(2 * t - i, 0, e, i) + 0.5 * e + n;
            },
          },
        }.Run(t);
  };
window.OnlineWebFonts_Com =
  window.OnlineWebFonts_Com ||
  function (t) {
    return new OnlineWebFonts_Animations(t);
  };
if (typeof Object.assign != "function") {
  Object.assign = function (e) {
    e = Object(e);
    for (var i = 1; i < arguments.length; i++) {
      var s = arguments[i];
      if (s != null) {
        for (var k in s) {
          if (Object.prototype.hasOwnProperty.call(s, k)) {
            e[k] = s[k];
          }
        }
      }
    }
    return e;
  };
}
window.__Animations = Object.assign(window.__Animations || {}, {
  233323: {
    Line: [
      {
        Duration: "1191",
        Width: "3",
        Color: "#000000",
        Path: "M39.3,235c0,1,0.8,1.8,1.8,1.8h173.8c1,0,1.8-0.8,1.8-1.8V63.5H39.3V235z M128,70.9c42.9,0,77.7,35.1,77.7,78.4c0,43.3-34.8,78.4-77.7,78.4s-77.7-35.1-77.7-78.4C50.3,105.9,85.1,70.9,128,70.9z",
      },
      {
        Duration: "579",
        Width: "3",
        Color: "#000000",
        Path: "M214.9,19.2H41.1c-1,0-1.8,0.8-1.8,1.8v33.3h177.3V21C216.7,20,215.9,19.2,214.9,19.2z M64,45c-4.6,0-8.2-3.7-8.2-8.3s3.7-8.3,8.2-8.3s8.2,3.7,8.2,8.3C72.2,41.3,68.6,45,64,45z M93.3,45c-4.6,0-8.2-3.7-8.2-8.3s3.7-8.3,8.2-8.3s8.2,3.7,8.2,8.3C101.5,41.3,97.8,45,93.3,45z M190.2,45c-4.6,0-8.2-3.7-8.2-8.3s3.7-8.3,8.2-8.3s8.2,3.7,8.2,8.3C198.4,41.3,194.7,45,190.2,45z",
      },
      {
        Duration: "53",
        Width: "3",
        Color: "#cc0c0c",
        Path: "M55.8,36.7c0.1-4.6,3.8-8.2,8.4-8.1c4.6,0.1,8.2,3.9,8.1,8.5c-0.1,4.6-3.8,8.2-8.4,8.1c-4.4-0.1-8-3.7-8.1-8.1V36.7z",
      },
      {
        Duration: "53",
        Width: "3",
        Color: "#000000",
        Path: "M85,36.7c0.1-4.6,3.8-8.2,8.4-8.1s8.2,3.9,8.1,8.5c-0.1,4.6-3.8,8.2-8.4,8.1c-4.4-0.1-8-3.7-8.1-8.1V36.7z",
      },
      {
        Duration: "1982",
        Width: "3",
        Color: "#000000",
        Path: "M222.9,10H33.1c-1.6,0-2.9,1.3-2.9,2.9v230.1c0,1.6,1.3,2.9,2.9,2.9h189.7c1.6,0,2.9-1.3,2.9-2.9V12.9C225.8,11.3,224.5,10,222.9,10z M216.7,235c0,1-0.8,1.8-1.8,1.8H41.1c-1,0-1.8-0.8-1.8-1.8V63.5h177.3V235L216.7,235z M216.7,54.2H39.3V21c0-1,0.8-1.8,1.8-1.8h173.8c1,0,1.8,0.8,1.8,1.8L216.7,54.2L216.7,54.2z",
      },
      {
        Duration: "53",
        Width: "3",
        Color: "#000000",
        Path: "M181.9,36.7c0.1-4.6,3.8-8.2,8.4-8.1c4.6,0.1,8.2,3.9,8.1,8.5c-0.1,4.6-3.8,8.2-8.4,8.1c-4.4-0.1-8-3.7-8.1-8.1V36.7z",
      },
      {
        Duration: "148",
        Width: "3",
        Color: "#000000",
        Path: "M153,119.8c11.7,4.9,19.8,16.2,19.8,29.4c0,12.9-7.8,24-19.1,29.1l-2.6-5.5c9.1-4.1,15.4-13,15.4-23.4c0-10.7-6.7-19.9-16.3-23.7L153,119.8z",
      },
      {
        Duration: "930",
        Width: "3",
        Color: "#000000",
        Path: "M128,227.6c42.9,0,77.7-35.1,77.7-78.4c0-43.3-34.8-78.4-77.7-78.4s-77.7,35.1-77.7,78.4C50.3,192.5,85.1,227.6,128,227.6z M128.9,80.1c38.4,0,69.5,31.4,69.5,70.1c0,38.7-31.1,70.1-69.5,70.1s-69.5-31.4-69.5-70.1C59.4,111.4,90.5,80.1,128.9,80.1z",
      },
      {
        Duration: "147",
        Width: "3",
        Color: "#000000",
        Path: "M166.5,149.3c0,10.4-6.3,19.3-15.4,23.4l2.6,5.5c11.3-5.1,19.1-16.2,19.1-29.1c0-13.2-8.2-24.4-19.8-29.4l-2.7,5.8C159.8,129.5,166.5,138.6,166.5,149.3z",
      },
    ],
    Box: { Width: "256", Height: "256" },
    Config: {
      Width: "3",
      Opacity: "1",
      Sequential: true,
      Animate: "Linear",
      Color: "#000000",
      Reverse: false,
    },
  },
});
