import { Component } from 'minicomponent';

const ConfiguratorLite = new Component({
  el: '#configurator-lite-container',
  name: 'Configurator Lite Component',
  events: {
    'click .nav-button': 'selectModel'
  },
  init() {

    this.contentElement = document.querySelector('.configurator-lite-content');
    //Shows the content once everything has been rendered so it doesn't show unexpected things on screen while loading.
    if (this.contentElement !== null) {
      this.contentElement.classList.remove('hidden');
    }
    this.currentComponentMode = null;
    this.currentModel = null
    this.vehicleDetails = [...document.querySelectorAll('.vehicle-details-container')];
    this.vehicleCOSYs = [...document.querySelectorAll('.configurator-lite-content__cosy-container img')];
    this.vehicleCTAContainers = [...document.querySelectorAll('.configurator-lite-content__cta-container')];
    this.navButtons = document.querySelectorAll('.nav-button');
    this.featuresElement = document.querySelector('.configurator-lite-content__vehicle-features');
    this.featuresElementList = document.querySelectorAll('.configurator-lite-content__vehicle-features-list');
    this.desktopHeaderElement = document.querySelector('.configurator-lite-header--desktop');
    this.carouselElement = document.querySelector('.configurator-lite-carousel');
    this.carouselPreviousButtonElement = document.querySelector('.configurator-lite-content__carousel-prev-button');
    this.carouselNextButtonElement = document.querySelector('.configurator-lite-content__carousel-next-button');
    this.configuratorLiteElement = document.querySelector('.configurator-lite');
    this.interactionButton = document.querySelector('.configurator-lite-content__interaction-area');
    this.interactionButtonDesktop = document.querySelector('.configurator-lite-content__interaction-area--desktop');
    this.backgroundVideoContainer = document.querySelector('.configurator-lite-content__background-video');
    this.carouselImagesContainer = document.querySelectorAll('.configurator-lite-carousel__image-container');
    this.videoBackgroundContainer = document.querySelectorAll('.configurator-lite-content__background-video-wrapper');
    this.configuratorLiteContentElement = document.querySelector('.configurator-lite-content');
    this.exteriorButtonElement = document.querySelector('.configurator-lite-content__toggle-button[data-view-mode="exterior"]');

    this.vehicleViewToggleObject = {
      element: document.querySelector('.configurator-lite-content__vehicle-view-toggle'),
      currentViewMode: 'exterior',
      buttonSelectedClass: 'configurator-lite-content__toggle-button--selected',
      sliderClass: 'configurator-lite-content__toggle-slider',
      buttons: document.querySelectorAll('.configurator-lite-content__toggle-button'),
      setThemeMode: function (themeMode) {
        switch (themeMode) {
          case 'light':
            this.element.classList.remove('configurator-lite-content__vehicle-view-toggle--dark');
            this.element.classList.add('configurator-lite-content__vehicle-view-toggle--light');
            break;
          case 'dark':
            this.element.classList.remove('configurator-lite-content__vehicle-view-toggle--light');
            this.element.classList.add('configurator-lite-content__vehicle-view-toggle--dark');
            break;
          default:
            break;
        }
      },
      toggleCurrentView: function (viewMode, targetButton, mainComponent) {

        if (this.currentViewMode == viewMode) {
          return;
        }

        let slider = this.element.querySelector(`.${this.sliderClass}`);
        let oldStateButton = this.element.querySelector(`.${this.buttonSelectedClass}`);
        this.currentViewMode = viewMode;

        oldStateButton.classList.remove(`${this.buttonSelectedClass}`);
        oldStateButton.ariaPressed = false;
        targetButton.classList.add(`${this.buttonSelectedClass}`);
        targetButton.ariaPressed = true;

        switch (viewMode) {
          case 'exterior':
            slider.style.left = "0%";
            mainComponent.setExteriorMode();
            break;
          case 'interior':
            slider.style.left = "50%";
            mainComponent.setInteriorMode();
            break;
          default:
            break;

        }

      },
      setVisible: function (isVisible) {
        if (isVisible) {
          this.element.style.display = 'flex';
        } else {
          this.element.style.display = 'none';
        }
      },
      init: function (mainComponent) {

        this.buttons.forEach((btn) => {
          btn.onclick = (e) => {
            let target = e.target.closest('button');
            let viewMode = target.dataset.viewMode;
            this.toggleCurrentView(viewMode, target, mainComponent);
          }
        })
      }
    };

    this.carouselObject = {
      element: null,
      imagesContainerElement: null,
      slideElement: null,
      nextButton: null,
      previousButton: null,
      totalSlides:null,
      currentScrollLeftValue: 0, //First slide's scrollLeft value starts at 0
      setOnScroll:function(callback){
        // This function was created because carousel is using scroll-behavior: smooth; and it has an
        // animation transition that takes time to finish,
        // this allows arrows to be set properly after the transition.
        let debounce;
        this.imagesContainerElement.onscroll = function () {
          clearTimeout(debounce);

          debounce = setTimeout(()=>{
            callback();
          },100)

        }.bind(this);
      },
      moveToNextSlide: function () {
        const slideWidth = this.slideElement.clientWidth;
        this.imagesContainerElement.scrollLeft += slideWidth;
        this.currentScrollLeftValue = this.imagesContainerElement.scrollLeft;
        this.nextButton.disabled = true;
        this.setOnScroll(function(){
          this.setArrows();
          this.nextButton.disabled = false;
        }.bind(this));
      },
      moveToPreviousSlide: function () {
        const slideWidth = this.slideElement.clientWidth;
        this.imagesContainerElement.scrollLeft -= slideWidth;
        this.previousButton.disabled = true;
        this.setOnScroll(function(){
          this.setArrows();
          this.previousButton.disabled = false;
        }.bind(this));
      },

      setArrows: function (isInit) {
        this.currentScrollLeftValue = this.imagesContainerElement.scrollLeft;

        let totalWidth = this.slideElement.clientWidth * (this.totalSlides - 1);
        if (totalWidth == 0) {
          this.nextButton.classList.add('hidden');
          this.previousButton.classList.add('hidden');
          return;
        }

        if ((this.currentScrollLeftValue + this.slideElement.clientWidth) <= totalWidth) {
          this.nextButton.classList.remove('hidden');
        } else {
          this.nextButton.classList.add('hidden');
        }

        if ((this.currentScrollLeftValue - this.slideElement.clientWidth) >= 0) {
          this.previousButton.classList.remove('hidden');
        } else {
          this.previousButton.classList.add('hidden');
        }

      },
      init: function (settings) {

        this.element = settings.element;
        this.imagesContainerElement = settings.imagesContainer;
        this.slideElement = settings.slideElement;
        this.previousButton = settings.previousButton;
        this.nextButton = settings.nextButton;
        this.totalSlides = this.imagesContainerElement.childElementCount;

        if (typeof this.previousButton !== 'undefined') {
          this.previousButton.onclick = this.moveToPreviousSlide.bind(this);
        }
        if (typeof this.nextButton !== 'undefined') {
          this.nextButton.onclick = this.moveToNextSlide.bind(this);
        }
        this.imagesContainerElement.scrollLeft = 0; //sets slide to first
        this.setArrows(true);
      }

    }

    this.videoObject = {

      element: null,
      onEndedCallback: null,
      play: function () {
        this.element.play();
      },
      pause: function () {
        this.element.pause();
      },
      restart: function () {
        this.element.load();
      },
      setOnEnded: function () {
        this.element.onended = function () {
          this.onEndedCallback();
          this.element.load();
        }.bind(this)
      },
      init: function (settings) {
        this.element = settings.element;
        this.onEndedCallback = settings.onEndedCallback;
        this.setOnEnded();
      }
    }

    this.setCarouselBreakpointLayoutSwitch();
    this.setVideoBackgroundBreakpointLayoutSwitch();

    var debounceTimeoutCarousel;
    window.addEventListener("resize", function () {
      if(!debounceTimeoutCarousel){
        debounceTimeoutCarousel = setTimeout(function(){
          debounceTimeoutCarousel = null;
          this.setCarouselBreakpointLayoutSwitch();
        }.bind(this),500)
      }

    }.bind(this))

    var debounceTimeoutVideo;
    window.addEventListener("resize", function () {

      if(!debounceTimeoutVideo){
        debounceTimeoutVideo = setTimeout(function(){
          debounceTimeoutVideo = null;
          this.setVideoBackgroundBreakpointLayoutSwitch();
        }.bind(this),500)
      }
    }.bind(this))

    this.interactionButton.onclick = function () {
      this.setAfterInteractionMode();
    }.bind(this);

    this.interactionButtonDesktop.onclick = function () {
      this.setAfterInteractionMode();
    }.bind(this);

    this.vehicleViewToggleObject.init(this);
    // Re-order nav buttons
    for (const item of this.navButtons) {
      const listItem = item.parentNode;
      const order = listItem.dataset.order;

      item.parentElement.style.order = order;
      item.tabIndex = order;
    }

    // Clean up CTA URLs
    for (const container of this.vehicleCTAContainers) {
      const CTAs = container.children;
      const modelType = container.dataset.vehicle.toLowerCase();

      for (const cta of CTAs) {
        cta.href = decodeURI(cta.href).replaceAll(' ', '-')

        // PDP URLs need to be formatted a bit differently depending on model
        if (cta.className === 'learn-more-cta') {
          switch (modelType) {
            case 'hardtop 2 door':
              cta.href = cta.href.replace('Hardtop-2-Door', 'hardtop');
              break;
            case 'mini cooper se':
              cta.href = cta.href.replace('MINI-Cooper-SE', 'electric-hardtop');
              break;
            default:
              cta.href = cta.href.toLowerCase();
              break;
          }
        }

        cta.href = encodeURI(cta.href);
      }
    }

    if (!this.currentModel) {
      
      let firstNavItem = document.querySelector(".nav-button[tabindex='1']");
      this.currentModel = firstNavItem.dataset.model.toLowerCase();

      this.toggleSelected(this.navButtons);
      this.toggleHidden(this.vehicleDetails);
      this.toggleHidden(this.vehicleCOSYs);
      this.toggleHidden(this.vehicleCTAContainers);
      this.toggleHidden(this.featuresElementList);
      this.toggleHidden(this.carouselImagesContainer);
      this.toggleHidden(this.videoBackgroundContainer);
      let carouselSettings = {
        element: document.querySelector('.configurator-lite-carousel'),
        imagesContainer: document.querySelector(`.configurator-lite-carousel__image-container[data-vehicle="${this.currentModel}" i]`),
        slideElement: document.querySelector(`.configurator-lite-carousel__image-container[data-vehicle="${this.currentModel}" i] .configurator-lite-carousel__slide`),
        previousButton: document.querySelector('.configurator-lite-content__carousel-prev-button'),
        nextButton: document.querySelector('.configurator-lite-content__carousel-next-button')
      };

      if (carouselSettings.imagesContainer.childElementCount > 0) {
        this.carouselObject.init(carouselSettings);
        this.vehicleViewToggleObject.element.classList.remove('hidden');
      } else {
        this.vehicleViewToggleObject.element.classList.add('hidden');
        if (this.currentComponentMode === 'interior') {
          this.vehicleViewToggleObject.toggleCurrentView("exterior", this.exteriorButtonElement, this);
        }
      }

    }
  },
  toggleHidden(elementList) {
    for (const element of elementList) {
      const modelType = element.dataset.vehicle

      if (modelType.toLowerCase() !== this.currentModel) {
        element.classList.add('hidden');
      } else {
        element.classList.remove('hidden');
      }
    }
  },
  toggleSelected(buttonList) {
    for (const button of buttonList) {
      const modelType = button.dataset.model

      if (modelType.toLowerCase() === this.currentModel) {
        button.classList.add('button-selected');
      } else {
        button.classList.remove('button-selected');
      }
    }
  },
  selectModel(e) {
    const modelType = e.target.dataset.model;

    this.currentModel = modelType.toLowerCase();

    if (this.currentComponentMode === 'afterInteraction') {
      this.stopAfterInteractionMode();
    }

    this.toggleSelected(this.navButtons)
    this.toggleHidden(this.vehicleDetails);
    this.toggleHidden(this.vehicleCOSYs);
    this.toggleHidden(this.vehicleCTAContainers);
    this.toggleHidden(this.featuresElementList);
    this.toggleHidden(this.carouselImagesContainer);
    this.toggleHidden(this.videoBackgroundContainer);
    let carouselSettings = {
      element: document.querySelector('.configurator-lite-carousel'),
      imagesContainer: document.querySelector(`.configurator-lite-carousel__image-container[data-vehicle="${this.currentModel}" i]`),
      slideElement: document.querySelector(`.configurator-lite-carousel__image-container[data-vehicle="${this.currentModel}" i] .configurator-lite-carousel__slide`),
      previousButton: document.querySelector('.configurator-lite-content__carousel-prev-button'),
      nextButton: document.querySelector('.configurator-lite-content__carousel-next-button')
    };

    if (carouselSettings.imagesContainer.childElementCount > 0) {
      this.carouselObject.init(carouselSettings);
      this.vehicleViewToggleObject.element.classList.remove('hidden');
    } else {
      this.vehicleViewToggleObject.element.classList.add('hidden');
      if (this.currentComponentMode === 'interior') {
        this.vehicleViewToggleObject.toggleCurrentView("exterior", this.exteriorButtonElement, this);
      }
    }

  },
  setAfterInteractionMode: function () {

    this.currentComponentMode = "afterInteraction";
    this.configuratorLiteElement.classList.add('configurator-lite--after-interaction-mode');
    this.interactionButton.classList.add('hidden');

    let videoWrapperElement = document.querySelector(`.configurator-lite-content__background-video-wrapper[data-vehicle="${this.currentModel}" i]`);
    let videoElementList = videoWrapperElement.querySelectorAll('video[class*="configurator-lite-content__video"]');
    let videoElement = null;

    videoElementList.forEach(function(el){
      if(window.getComputedStyle(el,null).display !== 'none'){
        videoElement = el;
      }
    })

    let videoSettings = {
      element: videoElement,
      onEndedCallback: function () {
        this.stopAfterInteractionMode();
      }.bind(this)
    }

    this.vehicleViewToggleObject.element.classList.add('hidden');
    this.videoObject.init(videoSettings);
    this.videoObject.play();
  },
  stopAfterInteractionMode: function () {

    if (this.videoObject.element !== null) {
      this.videoObject.pause();
      this.videoObject.restart();
    }
    this.configuratorLiteElement.classList.remove('configurator-lite--after-interaction-mode');
    this.vehicleViewToggleObject.element.classList.remove('hidden');
    this.interactionButton.classList.remove('hidden');
  },

  setInteriorMode: function () {

    this.currentComponentMode = "interior";
    this.stopAfterInteractionMode();

    this.configuratorLiteElement.classList.remove('configurator-lite--after-interaction-mode');
    this.configuratorLiteElement.classList.add('configurator-lite--interior-mode');
    let detailsContainers = document.querySelectorAll('.vehicle-details-container');
    detailsContainers.forEach(function (container) {
      container.classList.add('vehicle-details-container--light');
    });
    this.vehicleViewToggleObject.setThemeMode('light');
    this.featuresElement.classList.add('hidden');
    this.desktopHeaderElement.classList.add('hidden');
    this.carouselElement.classList.remove('hidden');
    this.interactionButton.classList.add('hidden');
    this.carouselNextButtonElement.classList.remove('hidden');
    this.carouselPreviousButtonElement.classList.remove('hidden');
    this.carouselObject.setArrows();
  },
  setExteriorMode: function () {
    this.currentComponentMode = "exterior";
    this.configuratorLiteElement.classList.remove('configurator-lite--interior-mode');
    let detailsContainers = document.querySelectorAll('.vehicle-details-container');
    detailsContainers.forEach(function (container) {
      container.classList.remove('vehicle-details-container--light');
    });
    this.vehicleViewToggleObject.setThemeMode('dark');
    this.featuresElement.classList.remove('hidden');
    this.desktopHeaderElement.classList.remove('hidden');
    this.carouselElement.classList.add('hidden');
    this.carouselNextButtonElement.classList.add('hidden');
    this.carouselPreviousButtonElement.classList.add('hidden');
    this.interactionButton.classList.remove('hidden');
  },
  setCarouselBreakpointLayoutSwitch: function () {
    let configuratorLiteContentWrapper = document.querySelector('.configurator-lite-content-wrapper');
    if (window.matchMedia('(min-width: 1200px)').matches) {
      this.configuratorLiteElement.prepend(this.carouselElement);
    } else {
      configuratorLiteContentWrapper.prepend(this.carouselElement);
    }
  },
  setVideoBackgroundBreakpointLayoutSwitch: function () {
    if (window.matchMedia('(min-width: 1200px)').matches) {

      this.configuratorLiteElement.prepend(this.backgroundVideoContainer);
    } else {
      this.configuratorLiteContentElement.insertBefore(this.backgroundVideoContainer, document.querySelector('.configurator-lite-content__vehicle-details'));

    }
  },

});

export default ConfiguratorLite
