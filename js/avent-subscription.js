"use strict";Object.defineProperty(exports,"__esModule",{value:!0});class AventSubscription{constructor(t,i){this.filters=[],this.notifier=t,this.handler=i}filter(t){this.filters.push(t)}handleAvent(t){for(let i of this.filters)if(!i.verify(t))return;this.handler(t)}unsubscribe(){return!!this.notifier&&(this.notifier.unsubscribe(this),this.notifier=void 0,!0)}}exports.AventSubscription=AventSubscription;