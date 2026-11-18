/* Girişli cihaz üçün sürətli yönləndirmə. Hər iki səhifənin <head> hissəsində, ən əvvəldə işləyir.
   Supabase sessiyası brauzerdə saxlanılıb-saxlanılmadığına yerli olaraq baxır, şəbəkəni gözləmir. */
(function () {
  var C = window.QISAGET_CONFIG || {}, has = false;
  try {
    var h = new URL(C.SUPABASE_URL).hostname.split('.')[0];
    var raw = localStorage.getItem('sb-' + h + '-auth-token');
    if (raw) { var s = JSON.parse(raw); has = !!(s && (s.refresh_token || s.access_token)); }
  } catch (e) {}
  window.QS_HAS_SESSION = has;
  var onAdmin = /\/admin(\.html)?\/?$/.test(location.pathname);
  var root = document.documentElement;
  if (has && onAdmin) {
    root.className += ' qs-splash';
  } else if (has && !/[?&]signup=1/.test(location.search)) {
    /* Açılış səhifəsi heç görünməsin: ağ ekran, dərhal idarə panelinə keçid. */
    root.className += ' qs-go';
    var st = document.createElement('style');
    st.textContent = 'html.qs-go{background:#fff}html.qs-go body{visibility:hidden}';
    document.head.appendChild(st);
    location.replace('/admin');
  }
})();
