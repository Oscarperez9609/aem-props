import { Component, breakpoints } from 'minicomponent'
import debounce from 'minilib/utility/debounce'

const FAQ = new Component({
  el: '.faq-element-wrapper',
  name: 'faq Component',
  events: {
    'click .question-wrapper': 'toggle',
    'click .question': 'toggle',
    'click .modelData-header': 'toggle',
    'click .modelData-header p': 'toggle',
    'click .modelData-header div': 'toggle',
    'click .arrow': 'toggle',
    'click .faq-element': 'toggle'
  },
  init() {
    this.FaqID = []
    this.toggleClassName = 'active'
    this.getDom()
    //is modal
    if (this.modal) {
      this.modal.classList.add('faq-modal');
    }
    this.hideAnswer()
    this.getFaqIDs()
    this.customEvents()

    if (window.location.hash) {
      const id = window.location.hash.substring(0);
      this.jumpLink(id)
    }
  },
  customEvents() {
    window.addEventListener('resize', debounce(() => this.hideAnswer(), 200))
    this.addJumpLinkListeners()
  },
  getDom() {
    this.faqElement = this.element.querySelectorAll('.faq-element')
    this.anchors = this.element.querySelectorAll('a[href]')
    this.siteSubnavHeight = (document.querySelector('.SiteSubnav')) ? document.querySelector('.SiteSubnav').clientHeight : null
    this.modal = (document.querySelector('.Modal .faq')) ? document.querySelector('.Modal .faq').closest('.Modal') : null;
  },
  isActive(target) {
    return target.classList.contains(this.toggleClassName)
  },
  toggle(event) {
    const target = event.target.closest('.faq-element')
    if (!this.isActive(target)) {
      this.closeAll()
    }
    target.classList.toggle(this.toggleClassName)
  },
  closeAll() {
    Array.from(this.faqElement).forEach(faq => {
      faq.classList.remove(this.toggleClassName)
    })
  },
  hideAnswer() {
    const answerList = this.element.querySelectorAll('.answer')
    Array.from(answerList).forEach(answer => {
      answer.style.marginTop = `-${answer.clientHeight}px`
    })
  },
  getFaqIDs() {
    Array.from(this.faqElement).forEach(faq => {
      this.FaqID.push(faq.id)
    })
  },
  getAnchorsByID(id) {
    return Array.from(document.querySelectorAll(`a[href="#${id}"]`))
  },
  addJumpLinkListeners() {
    this.FaqID.forEach(faq => {
      this.getAnchorsByID(faq).forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          const id = event.target.attributes['href'].value
          this.jumpLink(id)
        })
      })
    })
  },
  jumpLink(id) {
    this.closeAll()
    window.setTimeout(() => {

      if (id === '' || id === '#' || id.indexOf('#/') > -1) {
        return;
      }
      try {
        const target = this.element.querySelector(`.faq-element${id}`);
        if (target) {
          target.click();
        }

      } catch (error) {
        return;
      }
    }, 1000)
  }
})

export default FAQ
