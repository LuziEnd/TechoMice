document.addEventListener('DOMContentLoaded', function() {
  // Renk seçicileri
  const headerColorPicker = document.getElementById('headerColor');
  const textColorPicker = document.getElementById('textColor');
  const bodyColorPicker = document.getElementById('bodyColor');
  const saveButton = document.getElementById('saveButton');
  const notification = document.getElementById('notification');
  const pageTextColorPicker = document.getElementById('pageTextColor');
  
  // Kaydedilmiş renkleri yükle
  chrome.storage.sync.get(['headerColor', 'textColor', 'bodyColor', 'pageTextColor'], function(colors) {
    headerColorPicker.value = colors.headerColor || '#ffffff';
    textColorPicker.value = colors.textColor || '#000000';
    bodyColorPicker.value = colors.bodyColor || '#ffffff';
    pageTextColorPicker.value = colors.pageTextColor || '#000000';
  });

  // Renk değişikliklerini kaydet
  function saveColors() {
    const colors = {
      headerColor: headerColorPicker.value,
      textColor: textColorPicker.value,
      bodyColor: bodyColorPicker.value,
      pageTextColor: pageTextColorPicker.value
    };
    chrome.storage.sync.set(colors, function() {
      console.log('Renkler kaydedildi:', colors);
      showNotification();
    });
  }

  // Bildirim göster
  function showNotification() {
    notification.style.display = 'block';
    setTimeout(() => {
      notification.style.display = 'none';
    }, 3000);
  }

  // Kaydet butonuna event listener ekle
  saveButton.addEventListener('click', saveColors);
});
