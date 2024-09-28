console.log('Content script başlatıldı');

function applyColors() {
  console.log('applyColors çağrıldı');
  chrome.storage.sync.get(['headerColor', 'textColor', 'bodyColor', 'pageTextColor'], function(colors) {
    console.log('Alınan renkler:', colors);
    
    if (colors.headerColor) {
      document.querySelectorAll('.p-header, .p-navSticky, .p-nav').forEach(el => {
        el.style.backgroundColor = colors.headerColor;
      });
    }
    if (colors.textColor) {
      document.querySelectorAll('.p-header, .p-navSticky, .p-nav, .p-header a, .p-nav a').forEach(el => {
        el.style.color = colors.textColor;
      });
    }
    if (colors.bodyColor) {
      console.log('Arkaplan rengi uygulanıyor:', colors.bodyColor);
      document.body.style.backgroundColor = colors.bodyColor;
      document.querySelectorAll('.p-body-inner, .block-container, .p-body-main').forEach(el => {
        el.style.backgroundColor = colors.bodyColor;
      });
    }
    if (colors.pageTextColor) {
      console.log('Sayfa metin rengi uygulanıyor:', colors.pageTextColor);
      document.body.style.color = colors.pageTextColor;
      document.querySelectorAll('.p-body, .p-body-inner, .block-container, .block-body, .message-body').forEach(el => {
        el.style.color = colors.pageTextColor;
      });
    }
    
    console.log('Renkler uygulandı');
  });
}

// Sayfa yüklendiğinde çalıştır
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyColors);
} else {
  applyColors();
}

// Renk değişikliklerini dinle
chrome.storage.onChanged.addListener(function(changes, namespace) {
  console.log('Storage değişikliği algılandı:', changes);
  if (namespace === 'sync') {
    applyColors();
  }
});

console.log('Content script tamamlandı');