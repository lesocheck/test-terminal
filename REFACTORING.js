function func(s, a, b) {
  if (!s || !a && !b) return -1;
  if (a && b) return Math.max(s.lastIndexOf(a), s.lastIndexOf(b));
  if (a && !b) return s.lastIndexOf(a);
  if (!a && b) return s.lastIndexOf(b);
}