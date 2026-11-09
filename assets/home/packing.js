// Click the packing to step from n squares to the best known packing of n-1. At zero it goes up in smoke.
(function () {
  var P = {"17":[4.67553,[[0.5,4.1755,0],[4.1755,4.1755,0],[1.5,4.1755,0],[3.1755,4.1755,0],[0.5,3.1755,0],[4.1755,3.1755,0],[0.5,0.5,0],[4.1755,0.5,0],[0.7042,1.9713,-39.805],[1.436,1.2875,-39.805],[1.5567,2.5626,-39.805],[2.2886,1.8788,-39.805],[2.2953,3.2488,-39.805],[3.0271,2.565,-39.805],[2.3473,0.5,0],[3.2451,1.303,36.624],[4.1755,2.0621,0]]],"11":[3.87708,[[0.5,0.5,0],[0.5,3.3771,0],[3.3771,2.5326,0],[3.3771,0.5,0],[3.3771,1.5,0],[2.3771,0.5,0],[1.4526,1.2723,-40.182],[0.7046,1.9365,-40.182],[2.1885,1.9596,-40.182],[1.4406,2.6238,-40.182],[2.3408,3.1725,-40.182]]],"5":[2.70711,[[0.5,2.2071,0],[2.2071,2.2071,0],[0.5,0.5,0],[2.2071,0.5,0],[1.3536,1.3536,-45]]],"10":[3.70711,[[1.5098,2.1973,-45],[0.5,1.5,0],[3.2071,3.2071,0],[3.2071,2.2071,0],[2.2838,1.4232,-45],[3.1712,0.5355,0],[0.5,0.5,0],[1.5,0.5,0],[2.2071,3.2071,0],[0.7379,2.9689,45]]],"1":[1,[[0.5,0.5,0]]],"2":[2,[[0.5,1.5,0],[1.5,1.5,0]]],"3":[2,[[0.5,1.5,0],[1.5,1.5,0],[0.5,0.5,0]]],"4":[2,[[0.5,1.5,0],[1.5,1.5,0],[0.5,0.5,0],[1.5,0.5,0]]],"6":[3,[[0.5,2.5,0],[1.5,2.5,0],[2.5,2.5,0],[0.5,1.5,0],[0.5,0.5,0],[2.5,0.5,0]]],"7":[3,[[0.5,2.5,0],[1.5,2.5,0],[2.5,2.5,0],[0.5,1.5,0],[2.5,1.5,0],[0.5,0.5,0],[2.5,0.5,0]]],"8":[3,[[0.5,2.5,0],[1.5,2.5,0],[2.5,2.5,0],[0.5,1.5,0],[2.5,1.5,0],[0.5,0.5,0],[1.5,0.5,0],[2.5,0.5,0]]],"9":[3,[[0.5,2.5,0],[1.5,2.5,0],[2.5,2.5,0],[0.5,1.5,0],[1.5,1.5,0],[2.5,1.5,0],[0.5,0.5,0],[1.5,0.5,0],[2.5,0.5,0]]],"12":[4,[[0.5,3.5,0],[1.5,3.5,0],[2.5,3.5,0],[3.5,3.5,0],[0.5,2.5,0],[3.5,2.5,0],[0.5,1.5,0],[3.5,1.5,0],[0.5,0.5,0],[1.5,0.5,0],[2.5,0.5,0],[3.5,0.5,0]]],"13":[4,[[0.5,3.5,0],[1.5,3.5,0],[2.5,3.5,0],[3.5,3.5,0],[0.5,2.5,0],[2.5,2.5,0],[3.5,2.5,0],[0.5,1.5,0],[3.5,1.5,0],[0.5,0.5,0],[1.5,0.5,0],[2.5,0.5,0],[3.5,0.5,0]]],"14":[4,[[0.5,3.5,0],[1.5,3.5,0],[2.5,3.5,0],[3.5,3.5,0],[0.5,2.5,0],[2.5,2.5,0],[3.5,2.5,0],[0.5,1.5,0],[1.5,1.5,0],[3.5,1.5,0],[0.5,0.5,0],[1.5,0.5,0],[2.5,0.5,0],[3.5,0.5,0]]],"15":[4,[[0.5,3.5,0],[1.5,3.5,0],[2.5,3.5,0],[3.5,3.5,0],[0.5,2.5,0],[2.5,2.5,0],[3.5,2.5,0],[0.5,1.5,0],[1.5,1.5,0],[2.5,1.5,0],[3.5,1.5,0],[0.5,0.5,0],[1.5,0.5,0],[2.5,0.5,0],[3.5,0.5,0]]],"16":[4,[[0.5,3.5,0],[1.5,3.5,0],[2.5,3.5,0],[3.5,3.5,0],[0.5,2.5,0],[1.5,2.5,0],[2.5,2.5,0],[3.5,2.5,0],[0.5,1.5,0],[1.5,1.5,0],[2.5,1.5,0],[3.5,1.5,0],[0.5,0.5,0],[1.5,0.5,0],[2.5,0.5,0],[3.5,0.5,0]]]};
  var btn = document.querySelector(".packbtn");
  if (!btn) return;
  var svg = btn.querySelector("svg"), wall = svg.querySelector(".wall");
  var NS = "http://www.w3.org/2000/svg", V = 467.553, U = 100;
  var calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var n = 17, tiles, run = 0, smoke = [], smoking = false, W = { o: 0, L: V };

  function inset(m) { return (V - P[m][0] * U) / 2; }
  function drawWall() {
    wall.setAttribute("x", W.o); wall.setAttribute("y", W.o);
    wall.setAttribute("width", W.L); wall.setAttribute("height", W.L);
  }
  function targets(m) {
    var o = inset(m);
    return P[m][1].map(function (q) { return { x: q[0] * U + o, y: q[1] * U + o, t: q[2], k: U }; });
  }
  function draw(o) {
    o.el.setAttribute("x", -o.k / 2); o.el.setAttribute("y", -o.k / 2);
    o.el.setAttribute("width", o.k); o.el.setAttribute("height", o.k);
    o.el.setAttribute("transform", "translate(" + o.x + " " + o.y + ") rotate(" + o.t + ")");
  }
  function tint(o, t) { o.el.setAttribute("class", t ? "tilt" : "flat"); }

  svg.querySelectorAll("polygon, title").forEach(function (e) { e.remove(); });
  tiles = targets(17).map(function (o) {
    o.el = document.createElementNS(NS, "rect");
    tint(o, o.t); draw(o); svg.insertBefore(o.el, wall);
    return o;
  });

  function rnd(a, b) { return a + Math.random() * (b - a); }
  function puff(x, y, count, spread, s0, s1, life, rise) {
    if (calm) return;
    for (var i = 0; i < count; i++) {
      var el = document.createElementNS(NS, "rect");
      el.setAttribute("class", Math.random() < 0.6 ? "smoke" : "smoke faint");
      el.setAttribute("opacity", 0);
      svg.appendChild(el);
      smoke.push({
        el: el, x: x + rnd(-spread, spread), y: y + rnd(-spread, spread),
        drift: rnd(-0.35, 0.35) * rise, rise: rise * rnd(0.6, 1.25),
        sway: rnd(8, 34), phase: rnd(0, 6.28), r: rnd(0, 90), vr: rnd(-160, 160),
        s0: s0 * rnd(0.6, 1.3), s1: s1 * rnd(0.7, 1.4), life: life * rnd(0.6, 1.2), delay: rnd(0, life * 0.28), age: 0
      });
    }
    if (!smoking) { smoking = true; var last = performance.now(); requestAnimationFrame(function tick(now) {
      var dt = now - last; last = now;
      smoke = smoke.filter(function (p) {
        p.age += dt;
        var e = (p.age - p.delay) / p.life;
        if (e < 0) return true;
        if (e >= 1) { p.el.remove(); return false; }
        var s = p.s0 + (p.s1 - p.s0) * e;
        var x = p.x + p.drift * e + Math.sin(e * 5 + p.phase) * p.sway * e;
        var y = p.y - p.rise * (1 - (1 - e) * (1 - e));
        p.el.setAttribute("x", -s / 2); p.el.setAttribute("y", -s / 2);
        p.el.setAttribute("width", s); p.el.setAttribute("height", s);
        p.el.setAttribute("transform", "translate(" + x + " " + y + ") rotate(" + (p.r + p.vr * e) + ")");
        p.el.setAttribute("opacity", Math.min(1, e * 8) * Math.pow(1 - e, 1.4));
        return true;
      });
      if (smoke.length) requestAnimationFrame(tick); else smoking = false;
    }); }
  }

  function vanish() {
    run++;
    btn.disabled = true;
    var o = tiles[0], k = o.k;
    o.el.remove(); wall.remove(); tiles = [];
    if (calm) { btn.hidden = true; return; }
    puff(o.x, o.y, 60, k * 0.48, 12, 50, 1700, 560);
    for (var i = 0; i < 26; i++) {
      var L = W.L, d = rnd(0, 4 * L), side = Math.floor(d / L), a = d - side * L;
      var p = side == 0 ? [a, 0] : side == 1 ? [L, a] : side == 2 ? [L - a, L] : [0, L - a];
      puff(W.o + p[0], W.o + p[1], 1, 4, 9, 34, 1500, 420);
    }
    setTimeout(function () { btn.classList.add("gone"); }, 1300);
    setTimeout(function () { btn.hidden = true; }, 2700);
  }

  function step() {
    if (n === 1) { n = 0; vanish(); return; }
    n--;
    var goal = targets(n), pairs = [], used = {}, taken = {}, next = new Array(n);
    tiles.forEach(function (a, i) { goal.forEach(function (g, j) {
      pairs.push([Math.pow(a.x - g.x, 2) + Math.pow(a.y - g.y, 2), i, j]);
    }); });
    pairs.sort(function (a, b) { return a[0] - b[0]; });
    pairs.forEach(function (p) {
      if (used[p[1]] || taken[p[2]]) return;
      used[p[1]] = taken[p[2]] = true; next[p[2]] = tiles[p[1]];
    });
    tiles.forEach(function (o, i) {
      if (used[i]) return;
      o.el.remove();
      puff(o.x, o.y, 9, o.k * 0.34, 12, 38, 800, 170);
    });
    var moves = next.map(function (o, j) {
      var g = goal[j], dt = ((g.t - o.t + 45) % 90 + 90) % 90 - 45;
      tint(o, g.t);
      return { o: o, x: o.x, y: o.y, t: o.t, k: o.k, dx: g.x - o.x, dy: g.y - o.y, dt: dt, dk: g.k - o.k };
    });
    tiles = next;
    var w0 = { o: W.o, L: W.L }, wo = inset(n), wL = P[n][0] * U;
    var id = ++run, start = performance.now(), dur = calm ? 0 : 420;
    (function frame(now) {
      if (id !== run) return;
      var e = dur ? Math.min(1, (now - start) / dur) : 1, f = 1 - Math.pow(1 - e, 3);
      moves.forEach(function (m) {
        m.o.x = m.x + m.dx * f; m.o.y = m.y + m.dy * f; m.o.t = m.t + m.dt * f; m.o.k = m.k + m.dk * f;
        draw(m.o);
      });
      W.o = w0.o + (wo - w0.o) * f; W.L = w0.L + (wL - w0.L) * f;
      drawWall();
      if (e < 1) requestAnimationFrame(frame);
    })(start);
    btn.setAttribute("aria-label", n + " squares packed in a square. Remove one.");
  }
  btn.addEventListener("click", step);
})();
