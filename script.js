'use strict';
const BUSINESS_EMAIL = 'gpsunited@outlook.com.au';
const WHATSAPP_NUMBER = '61424407607';
const form = document.getElementById('quoteForm');
const tabs = [...document.querySelectorAll('.tab-btn')];
function setInstallation(tab) {
  tabs.forEach(button => {
    const active = button === tab;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
    document.getElementById('panel-' + button.dataset.tab).classList.toggle('active', active);
  });
  const name = tab.dataset.tab === 'above' ? 'Above the sink' : 'Below the sink';
  document.getElementById('sumInstall').textContent = name;
  document.getElementById('installationValue').value = name;
}
tabs.forEach(tab => tab.addEventListener('click', () => setInstallation(tab)));
setInstallation(tabs[0]);
const choices = [...document.querySelectorAll('.choice-btn')];
function chooseContact(button) {
  choices.forEach(choice => {
    choice.classList.toggle('active', choice === button);
    choice.setAttribute('aria-pressed', String(choice === button));
  });
  document.getElementById('sumContact').textContent = button.dataset.method;
  document.getElementById('preferredContactValue').value = button.dataset.method;
}
choices.forEach(button => button.addEventListener('click', () => chooseContact(button)));
chooseContact(choices[0]);
function value(id) { return document.getElementById(id).value.trim(); }
function validate() {
  let firstInvalid = null;
  form.querySelectorAll('.field input, .field textarea').forEach(input => {
    input.setCustomValidity('');
    if (input.required && !input.value.trim()) input.setCustomValidity('Please complete this field.');
    if (input.id === 'phone' && input.value.replace(/\D/g, '').length < 8) input.setCustomValidity('Please enter a valid phone number with at least 8 digits.');
    const valid = input.checkValidity();
    input.classList.toggle('invalid', !valid);
    input.setAttribute('aria-invalid', String(!valid));
    input.parentElement.querySelector('.field-error').textContent = valid ? '' : input.validationMessage;
    if (!valid && !firstInvalid) firstInvalid = input;
  });
  if (firstInvalid) firstInvalid.focus();
  return !firstInvalid;
}
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!validate()) return;
  const channel = event.submitter?.dataset.channel || 'email';
  const message = `Hello, I would like an eSpring water purifier quote.\n\nFull name: ${value('fullName')}\nEmail: ${value('email')}\nPhone: ${value('phone')}\nInstallation: ${value('installationValue')}\nPreferred contact: ${value('preferredContactValue')}\nSubject: ${value('subject')}\n\nComment:\n${value('comment') || 'No additional comments.'}`;
  const url = channel === 'whatsapp'
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    : `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(value('subject'))}&body=${encodeURIComponent(message)}`;
  const fallback = document.getElementById('messageFallback');
  fallback.href = url;
  fallback.hidden = false;
  document.getElementById('sendStatus').textContent = `Your message is ready. Complete sending in ${channel === 'whatsapp' ? 'WhatsApp' : 'your email app'}. It has not been sent by this website.`;
  if (channel === 'whatsapp') window.open(url, '_blank', 'noopener,noreferrer');
  else window.location.href = url;
});
