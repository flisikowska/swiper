// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('navigationNextSlide', { prevSubject: 'optional' }, () => {
  cy.get('.swiper-button-next').click();
});
Cypress.Commands.add('navigationPrevSlide', { prevSubject: 'optional' }, () => {
  cy.get('.swiper-button-prev').click();
});
// subject, options
Cypress.Commands.add('getActiveSlide', { prevSubject: 'optional' }, () => {
  return cy.get('.swiper-slide-active');
});

Cypress.Commands.add('getSliderWrapper', { prevSubject: 'optional' }, () => {
  return cy.get('.swiper-wrapper');
});

Cypress.Commands.add('getSliderContainer', { prevSubject: 'optional' }, () => {
  return cy.get('.swiper-container');
});

Cypress.Commands.add('getSlide', { prevSubject: 'optional' }, (subject, slideIndex) => {
  return cy.get(`.swiper-slide:nth-child(${slideIndex + 1})`);
});
Cypress.Commands.add('getSlideContains', { prevSubject: 'optional' }, (subject, content) => {
  cy.get('.swiper-container').contains(content);
});
Cypress.Commands.add('getSlides', { prevSubject: 'optional' }, () => {
  return cy.get(`.swiper-slide`);
});
Cypress.Commands.add('swiperPage', { prevSubject: 'optional' }, () => {
  return cy.visit('cypress/test.html');
});

Cypress.Commands.add(
  'initSwiper',
  { prevSubject: 'optional' },
  (subject, config = {}, el = '.swiper-container') => {
    return cy.window().then((_window) => {
      _window.document.body.innerHTML = `
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">Slide 1</div>
          <div class="swiper-slide">Slide 2</div>
          <div class="swiper-slide">Slide 3</div>
          <div class="swiper-slide">Slide 4</div>
          <div class="swiper-slide">Slide 5</div>
          <div class="swiper-slide">Slide 6</div>
          <div class="swiper-slide">Slide 7</div>
          <div class="swiper-slide">Slide 8</div>
          <div class="swiper-slide">Slide 9</div>
          <div class="swiper-slide">Slide 10</div>
        </div>
        ${
          config.navigation
            ? `
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
        `
            : ''
        }
        ${
          config.pagination
            ? `
        <div class="swiper-pagination"></div>`
            : ''
        }
      </div>
      `;
      // eslint-disable-next-line dot-notation
      _window.swiper = new _window['SwiperClass'](el, config);
      return _window.swiper;
    });
  },
);

Cypress.Commands.add(
  'reinitSwiper',
  { prevSubject: 'optional' },
  (subject, config = {}, options) => {
    return cy.window().then((_window) => {
      _window.swiper.destroy();
      cy.initSwiper(config, options);
    });
  },
);

Cypress.Commands.add('swipeLeft', () => {
  cy.getSliderContainer()
    .trigger('pointerdown', { which: 1, pageX: 100, pageY: 100, force: true })
    .trigger('pointermove', { pageX: 50, pageY: 100, force: true })
    .trigger('pointerup', { force: true });
});

Cypress.Commands.add('swipeRight', () => {
  cy.getSliderContainer()
    .trigger('pointerdown', { which: 1, pageX: -100, pageY: 100, force: true })
    .trigger('pointermove', { pageX: 50, pageY: 100, force: true })
    .trigger('pointerup', { force: true });
});

Cypress.Commands.add('waitSwipe', (subject, time = 300) => {
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(time);
});
