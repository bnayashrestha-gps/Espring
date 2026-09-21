'use strict';
const BUSINESS_EMAIL = 'gpsunited@outlook.com';
const WHATSAPP_NUMBER = '61424407607';
const EMAIL_ENDPOINT = `https://formsubmit.co/ajax/${BUSINESS_EMAIL}`;
let sendingEmail = false;
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
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (sendingEmail) return;
  const status = document.getElementById('sendStatus');
  const fallback = document.getElementById('messageFallback');
  status.textContent = '';
  status.className = '';
  fallback.hidden = true;
  if (!validate()) return;
  const channel = event.submitter?.dataset.channel || 'email';
  const message = `Hello, I would like an eSpring water purifier quote.\n\nFull name: ${value('fullName')}\nEmail: ${value('email')}\nPhone: ${value('phone')}\nInstallation: ${value('installationValue')}\nPreferred contact: ${value('preferredContactValue')}\nSubject: ${value('subject')}\n\nComment:\n${value('comment') || 'No additional comments.'}`;
  if (channel === 'whatsapp') {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    fallback.href = url;
    fallback.hidden = false;
    status.textContent = 'Your message is ready. Complete sending in WhatsApp. It has not been sent by this website.';
    window.open(url, '_blank', 'noopener,noreferrer');
    return;
  }
  if (value('website')) return;
  if (!['https:', 'http:'].includes(window.location.protocol)) {
    status.textContent = 'Please open the published website to submit your enquiry. Email submission is not available from a downloaded file.';
    status.className = 'send-error';
    return;
  }
  const payload = {
    name: value('fullName'), email: value('email'), phone: value('phone'),
    installation: value('installationValue'), preferredContact: value('preferredContactValue'),
    subject: value('subject'), comment: value('comment') || 'No additional comments.',
    _subject: `eSpring enquiry: ${value('subject')}`,
    _replyto: value('email'), _template: 'table', _captcha: 'false', _honey: ''
  };
  const controls = [...form.querySelectorAll('input, textarea, button'), ...tabs, ...choices];
  const originalDisabled = controls.map(control => control.disabled);
  const emailButton = form.querySelector('.email-send');
  const originalLabel = emailButton.textContent;
  sendingEmail = true;
  controls.forEach(control => { control.disabled = true; });
  form.setAttribute('aria-busy', 'true');
  emailButton.textContent = 'Submitting…';
  status.textContent = 'Submitting your enquiry…';
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);
  try {
    const response = await fetch(EMAIL_ENDPOINT, {
      method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload), signal: controller.signal
    });
    const result = await response.json();
    const activationNeeded = /activat|confirm.*email|verify.*email/i.test(String(result.message || ''));
    if (activationNeeded) {
      status.className = 'send-error';
      status.textContent = 'Email enquiries are awaiting activation by the website owner. Your submission is not yet confirmed. Please use WhatsApp or call 0424 407 607 for now.';
    } else if (response.ok && (result.success === true || result.success === 'true')) {
      status.className = 'send-success';
      status.textContent = 'Thank you for submitting your enquiry. We’ll contact you shortly.';
      form.reset();
      setInstallation(tabs[0]);
      chooseContact(choices[0]);
    } else {
      throw new Error('Submission was not accepted');
    }
  } catch (error) {
    status.className = 'send-error';
    status.textContent = error.name === 'AbortError'
      ? 'The request timed out, so we could not confirm your submission. Your details are still here. Please try again later or use WhatsApp.'
      : 'We could not confirm your submission. Your details are still here. Please try again later, use WhatsApp, or call 0424 407 607.';
  } finally {
    clearTimeout(timeout);
    sendingEmail = false;
    controls.forEach((control, index) => { control.disabled = originalDisabled[index]; });
    form.setAttribute('aria-busy', 'false');
    emailButton.textContent = originalLabel;
    status.focus();
  }
});
