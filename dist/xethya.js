var xethya=function(t){var e={};function i(s){if(e[s])return e[s].exports;var r=e[s]={i:s,l:!1,exports:{}};return t[s].call(r.exports,r,r.exports,i),r.l=!0,r.exports}return i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:s})},i.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=34)}([function(t,e,i){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const r=s(i(32));e.default=function(t,e){if(!t)throw new r.default(e)}},function(t,e,i){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const r=s(i(2));class n extends r.default{constructor(){super("id")}add(...t){t.forEach(this._bindAttributeEvents.bind(this)),super.add(...t)}remove(t){this._unbindAttributeEvents(t),super.remove(t)}removeAll(){this.getAll().forEach(t=>this.remove(t.id))}setValue(t,e){if(this.contains(t)){this.get(t).rawValue=e}}getModifierSumForAll(){return 0===this.count?0:this.getAll().map(t=>t.modifiers.getSum()).reduce((t,e)=>t+e)}_bindAttributeEvents(t){t.on("change:value",(...e)=>{this.emit("change:attribute:value",...e),this.emit(`change:attribute:${t.id}:value`,...e)})}_unbindAttributeEvents(t){this.off(`change:attribute:${t}:value`)}static fromArray(t){const e=new n;return e.add(...t),e}}e.default=n},function(t,e,i){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const r=s(i(25));class n extends r.default{constructor(t){super(t),this.indexName=t}static fromArrayOf(t,e){const i=new n(e);return i.add(...t),i}}e.default=n},function(t,e,i){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const r=s(i(4));e.default=class extends r.default{constructor(){super()}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const s=i(33);e.default=class extends s.EventEmitter{constructor(){super()}}},function(t,e,i){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const r=s(i(2));class n extends r.default{constructor(){super("id")}add(...t){t.forEach(this._bindModifierEvents.bind(this)),super.add(...t)}remove(t){this._unbindModifierEvents(t),super.remove(t)}removeAll(){this.getAll().forEach(t=>this.remove(t.id))}setValue(t,e){if(this.contains(t)){this.get(t).value=e}}activate(t){if(this.contains(t)){this.get(t).active=!0}}deactivate(t){if(this.contains(t)){this.get(t).active=!1}}getSum(){return 0===this.count?0:this.where(t=>t.active).map(t=>t.value).reduce((t,e)=>t+e)}_bindModifierEvents(t){t.on("change:value",(...e)=>{this.emit("change:modifier:value",...e),this.emit(`change:modifier:${t.id}:value`,...e)}),t.on("change:active",(...e)=>{this.emit("change:modifier:active",...e),this.emit(`change:modifier:${t.id}:active`,...e)}),t.on("activate",(...e)=>{this.emit("activate:modifier",...e),this.emit(`activate:modifier:${t.id}`,...e)}),t.on("deactivate",(...e)=>{this.emit("deactivate:modifier",...e),this.emit(`deactivate:modifier:${t.id}`,...e)})}_unbindModifierEvents(t){this.off(`change:modifier:${t}:value`),this.off(`change:modifier:${t}:active`),this.off(`activate:modifier:${t}`),this.off(`deactivate:modifier:${t}`)}static fromArray(t){const e=new n;return e.add(...t),e}}e.default=n},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.P=87566873,e.Q=5631179,e.DefaultSeeds=[193945,740191,191];class s{constructor(t){this.settings=t;const i={p:e.P,q:e.Q,seedNumber:null};this.settings=Object.assign({},i,t);let s=this.settings.seedNumber;const r=this.settings.p,n=this.settings.q;s=s?Math.abs(s):e.DefaultSeeds[Math.floor(Math.random()*e.DefaultSeeds.length)],this.seedNumber=s,this.randomIndex=s,this.M=r*n,this.P=r,this.Q=n}static recommendsToReinstantiate(){return!0}recommendsToReinstantiate(){return s.recommendsToReinstantiate()}generateRandom(){const t=this.randomIndex*this.randomIndex%this.M;return this.randomIndex=t,Math.abs(t/this.M)}generateRandomInteger(){return Number(this.generateRandom().toString().replace(/\./,""))}}e.BlumBlumShubAlgorithm=s},function(t,e,i){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const r=s(i(2));class n extends r.default{constructor(){super("id")}add(...t){t.forEach(t=>this._bindStatEvents.bind(this)),super.add(...t)}remove(t){this._unbindStatEvents(t),super.remove(t)}removeAll(){this.getAll().forEach(t=>this.remove(t.id))}_bindStatEvents(t){t.on("change:value",(...e)=>{this.emit("change:stat:value",...e),this.emit(`change:stat:${t.id}:value`,...e)})}_unbindStatEvents(t){this.off(`change:stat:${t}:value`)}static fromArray(t){const e=new n;return e.add(...t),e}}e.default=n},function(t,e,i){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const r=s(i(0)),n=s(i(4));e.default=class extends n.default{constructor(t,e=0,i){super(),this._id="",this._value=0,this._active=!0,this.id=t,this.source=i,this._value=e}get id(){return this._id}set id(t){r.default(""!==t,"Modifier#set[id]: cannot be an empty String"),this._id=t}get active(){return this._active}set active(t){this._active!==t&&(this._active=t,this.emit(t?"activate":"deactivate",this),this.emit("change:active",this))}get value(){return this._value}set value(t){if(this._value!==t){const e=this._value;this.emit("before:change:value",{previousValue:e,newValue:t}),this._value=t,this.emit("change:value",this)}}get source(){return this._source}set source(t){this._source=t}}},function(t,e,i){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const r=s(i(2)),n=s(i(0));class a extends r.default{constructor(){super("id")}add(...t){t.forEach(t=>this._bindSkillEvents.bind(this)),super.add(...t)}remove(t){this._unbindSkillEvents(t),super.remove(t)}removeAll(){this.getAll().forEach(t=>this.remove(t.id))}useSkill(t){return n.default(this.contains(t),"SkillCollection#useSkill: skill does not exist"),this.get(t).use()}_bindSkillEvents(t){t.on("before:use",(...e)=>{this.emit("before:use:skill",...e),this.emit(`before:use:skill:${t.id}`,...e)}),t.on("use",(...e)=>{this.emit("use:skill",...e),this.emit(`use:skill:${t.id}`,...e)})}_unbindSkillEvents(t){this.off(`before:use:skill:${t}`),this.off(`use:skill:${t}`)}static fromArray(t){const e=new a;return e.add(...t),e}}e.default=a},function(t,e,i){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const r=s(i(22));e.default=class extends r.default{constructor(t){super(),this.rolls=this.rolls.concat(t.rolls)}get throwType(){return this._throwType}set throwType(t){this._throwType=t}}},function(t,e,i){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const r=s(i(13)),n=i(6),a=i(23),u=s(i(10));e.ChanceThrow=class extends a.DiceThrow{constructor(t={randomStrategy:void 0}){super({numberOfDices:1,maxNumber:100,randomStrategy:t.randomStrategy||n.BlumBlumShubAlgorithm,randomStrategySettings:{seedNumber:Number(Math.random().toString().replace(/\./,""))}});const e={rollScores:{failure:new r.default(1,20),success:new r.default(21,90),criticalSuccess:new r.default(91,100)}};this.settings=Object.assign({},t,e)}_range(t){return this.settings.rollScores[t]}_calculateThrowType(t){for(let e of Object.keys(this.settings.rollScores))if(this._range(e).includes(t))return e}roll(){const t=super.roll(),e=new u.default(t),i=t.getRollSum();return e.throwType=this._calculateThrowType(i),e}}},function(t,e,i){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const r=s(i(24)),n=i(6),a=s(i(3)),u=s(i(0));class o extends a.default{constructor({faces:t=6,randomStrategy:e=n.BlumBlumShubAlgorithm,randomStrategySettings:i={}}={}){super(),this._faces=6,this.faces=t,this.setRandomStrategy(e,i),this._mustPreservePrng=e.recommendsToReinstantiate()}_regenerateRandomStrategyIfNeeded(){this._mustPreservePrng||this._initializeRandomizer()}_initializeRandomizer(){this._randomizer=new r.default(this.randomStrategy).create(this.randomStrategySettings)}roll(){this.emit("before:roll");const t=this._randomizer.generateRandom(),e=Math.ceil(t*this.faces);return this._regenerateRandomStrategyIfNeeded(),this.emit("roll",e),e}setRandomStrategy(t,e={}){this.randomStrategy=t,this.randomStrategySettings=e,this._initializeRandomizer()}get faces(){return this._faces}set faces(t){u.default(t>=2,"Dice#setFaces: a dice must have at least two faces"),this._faces=t}get randomStrategy(){return this._randomStrategy}set randomStrategy(t){this._randomStrategy=t}get randomStrategySettings(){return this._randomStrategySettings}set randomStrategySettings(t){this._randomStrategySettings=t}static rollD(t){return new o({faces:t}).roll()}}e.Dice=o},function(t,e,i){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const r=s(i(0));class n{constructor(t,e){r.default(t!==e,"Range#constructor: lowerBound and upperBound cannot be equal"),this.lowerBound=Math.min(t,e),this.upperBound=Math.max(t,e)}includes(t){return this.lowerBound<=t&&t<=this.upperBound}toString(){return`${this.lowerBound.toString()} ~ ${this.upperBound.toString()}`}static fromArray(t){return r.default(2===t.length,"Range#fromArray: values must be an Array of 2 numerical elements"),new n(t[0],t[1])}static fromNotation(t){const e="Range#fromNotation: notedRange must use one of these formats: x,y x;y x:y x~y";let i;r.default(void 0!==t,e),r.default("string"==typeof t,e);const s=[",",";",":","~"];r.default(s.some(e=>t.includes(e)),e);let a=!1;for(;!a;){const u=s.shift();if(a=t.includes(u)){const s=t.split(u).map(t=>t.trim());r.default(2===s.length,e),i=n.fromArray(s.map(t=>Number(t)))}}return i}}e.default=n},function(t,e,i){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const r=s(i(0)),n=s(i(4)),a=s(i(16)),u=s(i(5));e.Attribute=class extends n.default{constructor({id:t,initialValue:e=0,valueRange:i}){super(),this._rawValue=0,this._id="",this.modifiers=new u.default,this.id=t,this._rawValue=e,i&&(this._valueRange=i),this.modifiers.add(new a.default),this._updateBaseModifierValue()}_updateBaseModifierValue(){this.modifiers.setValue("base",this._rawValue)}get id(){return this._id}set id(t){r.default(""!==t,"Attribute#set[id]: cannot be an empty String"),this._id=t}get rawValue(){return this._rawValue}set rawValue(t){const e=this._valueRange;e&&r.default(e.includes(t),`Attribute#set[value]: value is out of range (must be within ${e.toString()})`);const i=this._rawValue;i!==t&&(this.emit("before:change:value",{previousValue:i,newValue:t}),this._rawValue=t,this._updateBaseModifierValue(),this.emit("change:value",this))}get value(){return this.rawValue+this.modifiers.getSum()}get baseModifierValue(){return this.modifiers.get("base").value}toString(){const t=this.modifiers.getSum(),e=t>=0?"+":"";return`${this.rawValue.toString()} (${e}${t.toString()})`}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.BaseModifierCalculator=function(t){return Math.floor((t-10)/2)}},function(t,e,i){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const r=s(i(8)),n=i(15);e.default=class extends r.default{constructor(t=n.BaseModifierCalculator){super("base"),this._calculateValue=n.BaseModifierCalculator,this._calculateValue=t}get value(){return super.value}set value(t){super.value=this._calculateValue(t)}}},function(t,e,i){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const r=s(i(18)),n=s(i(9));e.AbleEntity=class extends r.default{constructor(t){super(t),this._skills=n.default.fromArray(t.skills)}get skills(){return this._skills}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const s=i(19);e.default=class extends s.AbstractEntity{constructor(t){super(t)}}},function(t,e,i){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const r=s(i(3)),n=s(i(1)),a=s(i(5));e.AbstractEntity=class extends r.default{constructor({id:t,name:e="UnnamedEntity",volatile:i=!1,attributes:s=[],modifiers:r=[]}={}){super(),this._id=t,this._name=e,this._volatile=i,this._attributes=n.default.fromArray(s),this._modifiers=a.default.fromArray(r)}get id(){return this._id}get name(){return this._name}set name(t){this._name=t}get volatile(){return this._volatile}get attributes(){return this._attributes}get modifiers(){return this._modifiers}}},function(t,e,i){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const r=s(i(10));e.SkillThrowResult=class extends r.default{constructor({skillValue:t,skillAttributesModifierValue:e,throwResult:i}){super(i),this._skillValue=t,this._skillAttributeModifiersValue=e}get skillValue(){return this._skillValue}get skillAttributeModifiersValue(){return this._skillAttributeModifiersValue}get totalRollValue(){return this.skillValue+this.getRollSum()+this.skillAttributeModifiersValue}get failureRoll(){return this._failureRoll}set failureRoll(t){this._failureRoll=t}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const s=i(11),r=i(20);e.default=class extends s.ChanceThrow{constructor(t){super(),this._skill=t}get skill(){return this._skill}roll(){const t=super.roll();return new r.SkillThrowResult({skillValue:this._skill.value,skillAttributesModifierValue:this._skill.modifiers.getSum(),throwResult:t})}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=class{constructor(){this.rolls=[]}getRollSum(){return this.rolls.reduce((t,e)=>t+e)}}},function(t,e,i){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const r=i(12),n=s(i(22)),a=i(6),u=s(i(0));e.DiceThrow=class{constructor({numberOfDices:t=2,maxNumber:e=6,randomStrategy:i=a.BlumBlumShubAlgorithm,randomStrategySettings:s={}}={}){u.default(e>=2,"DiceThrow#constructor: expected `maxNumber` to be at least 2."),this.dices=[];for(let n=0;n<t;n+=1)this.dices.push(new r.Dice({faces:e,randomStrategy:i,randomStrategySettings:s}))}roll(){let t=new n.default;return t.rolls=this.dices.map(t=>t.roll()),t}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=class{constructor(t){this.constructorFunction=t}create(t){return new this.constructorFunction(t)}}},function(t,e,i){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const r=s(i(4)),n=s(i(0));e.default=class extends r.default{constructor(t){super(),this._list={},this.indexName=t}get count(){return Object.keys(this._list).length}get(t){return this._list[t]}getAll(){return Object.keys(this._list).map(t=>this._list[t])}where(t){return this.getAll().filter(t)}contains(t){return t in this._list}add(...t){this.emit("before:add",this,...t),t.forEach(t=>{const e=t[this.indexName];n.default(!this.contains(e),`An item already exists with key: ${e}`),this._list[e]=t}),this.emit("add",this)}remove(t){this.contains(t)&&(this.emit("before:remove",this),delete this._list[t],this.emit("remove"))}removeAll(){this.emit("before:removeAll",this),this._list={},this.emit("removeAll",this)}}},function(t,e,i){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const r=s(i(1)),n=s(i(5)),a=s(i(3)),u=s(i(0)),o=s(i(21)),l=i(11);e.Skill=class extends a.default{constructor({id:t,owner:e,attributes:i=[],modifiers:s=[],primaryAttribute:a=""}){super(),this._id=t,this.attributes=r.default.fromArray(i),this.modifiers=n.default.fromArray(s),this.attributes.count>0&&this._setPrimaryAttribute(a)}_setPrimaryAttribute(t){const e="string"==typeof t?t:t.id;u.default(this.attributes.contains(e),"Skill#constructor: primaryAttribute must be defined in attributes array"),this._primaryAttribute=this.attributes.get(e)}get primaryAttribute(){return this._primaryAttribute}set primaryAttribute(t){this._primaryAttribute=t}get id(){return this._id}get value(){return this._primaryAttribute.value}use(){this.emit("before:use",this);const t=new o.default(this).roll();return"failure"===t.throwType&&(t.failureRoll=(new l.ChanceThrow).roll()),this.emit("use",this),t}}},function(t,e,i){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const r=i(14),n=s(i(1));e.default=class extends r.Attribute{constructor(t,e){super({id:t}),this._lastCalculatedValue=0,this.attributes=new n.default,this.modifiers.remove("base"),this._calculateStat=e,this.attributes.on("change:attribute:value",this._valueChanged.bind(this))}_valueChanged(){this.emit("change:value",{previousValue:this._lastCalculatedValue,newValue:this.value})}get value(){const t=this._calculateStat(this);return this._lastCalculatedValue!==t&&(this.emit("change:value",{previousValue:this._lastCalculatedValue,newValue:t}),this._lastCalculatedValue=t),t}}},function(t,e,i){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const r=s(i(3)),n=s(i(1)),a=s(i(9)),u=s(i(7)),o=s(i(13));e.Race=class extends r.default{constructor({id:t,name:e="Unnamed Race",lifeExpectancy:i=o.default.fromArray([90,100]),defaultAlignment:s="neutral:neutral",heightRange:r=o.default.fromArray([165,185]),heritageAttributes:l=[],heritageSkills:c=[],heritageStats:h=[]}){super(),this.id=t,this.name=e,this.attributes=n.default.fromArray(l),this.skills=a.default.fromArray(c),this.stats=u.default.fromArray(h),this.lifeExpectancy=i,this.defaultAlignment=s,this.heightRange=r}}},function(t,e,i){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const r=i(17),n=s(i(8)),a=s(i(7));e.LivingEntity=class extends r.AbleEntity{constructor(t){super(t),this._race=t.race,this._age=t.age,this._weight=t.weight,this._height=t.height,this._stats=a.default.fromArray(t.stats),this._applyRacialTraits()}get stats(){return this._stats}get race(){return this._race}get age(){return this._age}get height(){return this._height}get weight(){return this._weight}_applyRacialTraits(){this._applyRaceAttributes(),this._applyRaceStats(),this._applyRaceSkills()}_applyRaceAttributes(){this._race.attributes.getAll().forEach(t=>{const e=new n.default(`${t.id}RaceTrait`,t.rawValue);this.attributes.get(t.id).modifiers.add(e)})}_applyRaceStats(){this.race.stats.getAll().forEach(t=>{const e=new n.default(`${t.id}RaceTrait`,t.value);this.stats.get(t.id).modifiers.add(e)})}_applyRaceSkills(){this.race.skills.getAll().forEach(t=>{const e=new n.default(`${t.id}RaceTrait`,t.value);this.skills.get(t.id).modifiers.add(e)})}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const s=i(12);e.CoinFlip=class extends s.Dice{constructor(){super({faces:2})}}},function(t,e,i){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const r=s(i(0));e.N=624,e.M=397,e.MATRIX_A=2567483615,e.UPPER_MASK=2147483648,e.LOWER_MASK=2147483647,e.INIT_BY_ARRAY_SEED=19650218;class n{constructor(t){let i;this.settings=t;const s={seedNumber:void 0};this.settings=Object.assign({},s,t);const r=this.settings.seedNumber;i=r?Math.abs(r):Number((new Date).getTime().toString().split("").sort(()=>.5-Math.random()).join("")),this.MT=new Array(e.N),this.MTI=e.N+1,this.seedNumber=i,this.initializeRandomGenerator(i)}static recommendsToReinstantiate(){return!1}recommendsToReinstantiate(){return n.recommendsToReinstantiate()}initializeRandomGenerator(t){let i=Math.abs(Math.floor(t));for(this.MT[0]=i>>0,this.MTI=1;this.MTI<e.N;this.MTI+=1)i=this.MT[this.MTI-1]^this.MT[this.MTI-1]>>30,this.MT[this.MTI]=(1812433253*((4294901760&i)>>16)<<16)+1812433253*(65535&i)+this.MTI,this.MT[this.MTI]=this.MT[this.MTI]>>0}initializeByArray(t){let i=1,s=0;const n=t.length;r.default(n>0,"MersenneTwister#initializeByArray: initKeyArray must be an Array of at least one non-negative number.");const a=t.map(t=>Math.abs(Math.floor(t)));this.initializeRandomGenerator(e.INIT_BY_ARRAY_SEED);let u=e.N>n?e.N:n;for(;u>0;){const t=this.MT[i-1]^this.MT[i-1]>>30;this.MT[i]=(this.MT[i]^(1664525*((4294901760&t)>>16)<<16)+1664525*(65535&t))+a[s]+s,this.MT[i]=this.MT[i]>>0,s+=1,(i+=1)>=e.N&&(this.MT[0]=this.MT[e.N-1],i=1),s>=n&&(s=0),u-=1}for(u=e.N-1;u>0;u-=1){const t=this.MT[i-1]^this.MT[i-1]>>30;this.MT[i]=(this.MT[i]^(1566083941*((4294901760&t)>>16)<<16)+1566083941*(65535&t))-i,this.MT[i]=this.MT[i]>>0,(i+=1)>=e.N&&(this.MT[0]=this.MT[e.N-1],i=1)}this.MT[0]=2147483648}generateRandomInteger(){let t;const i=[0,e.MATRIX_A];if(this.MTI>=e.N){let s;for(this.MTI===e.N+1&&this.initializeRandomGenerator(5489),s=0;s<e.N-e.M;s+=1)t=this.MT[s]&e.UPPER_MASK|this.MT[s+1]&e.LOWER_MASK,this.MT[s]=this.MT[s+e.M]^t>>1^i[1&t];for(;s<e.N-1;)t=this.MT[s]&e.UPPER_MASK|this.MT[s+1]&e.LOWER_MASK,this.MT[s]=this.MT[s+e.M-e.N]^t>>1^i[1&t],s+=1;t=this.MT[e.N-1]&e.UPPER_MASK|this.MT[0]&e.LOWER_MASK,this.MT[e.N-1]=this.MT[e.M-1]^t>>1^i[1&t],this.MTI=0}return this.MTI+=1,t=this.MT[this.MTI],t^=t>>11,t^=t<<7&2636928640,t^=t<<15&4022730752,(t^=t>>18)>>0}generateRandomInteger31(){return this.generateRandomInteger()>>1}generateRandomReal(){return this.generateRandomInteger()*(1/4294967295)}generateRandom(){return this.generateRandomInteger()*(1/4294967296)}generateRandomReal3(){return(this.generateRandomInteger()+.5)*(1/4294967296)}generateRandomReal53BitResolution(){return(671084464*(this.generateRandomInteger()>>5)+(this.generateRandomInteger()>>6))*(1/9007199254740992)}}e.MersenneTwisterAlgorithm=n},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=class extends Error{constructor(t){super(),this.message=`[AssertionError] An assertion has failed${t?": "+t:""}`}}},function(t,e,i){"use strict";var s=Object.prototype.hasOwnProperty,r="~";function n(){}function a(t,e,i,s,n){if("function"!=typeof i)throw new TypeError("The listener must be a function");var a=new function(t,e,i){this.fn=t,this.context=e,this.once=i||!1}(i,s||t,n),u=r?r+e:e;return t._events[u]?t._events[u].fn?t._events[u]=[t._events[u],a]:t._events[u].push(a):(t._events[u]=a,t._eventsCount++),t}function u(t,e){0==--t._eventsCount?t._events=new n:delete t._events[e]}function o(){this._events=new n,this._eventsCount=0}Object.create&&(n.prototype=Object.create(null),(new n).__proto__||(r=!1)),o.prototype.eventNames=function(){var t,e,i=[];if(0===this._eventsCount)return i;for(e in t=this._events)s.call(t,e)&&i.push(r?e.slice(1):e);return Object.getOwnPropertySymbols?i.concat(Object.getOwnPropertySymbols(t)):i},o.prototype.listeners=function(t){var e=r?r+t:t,i=this._events[e];if(!i)return[];if(i.fn)return[i.fn];for(var s=0,n=i.length,a=new Array(n);s<n;s++)a[s]=i[s].fn;return a},o.prototype.listenerCount=function(t){var e=r?r+t:t,i=this._events[e];return i?i.fn?1:i.length:0},o.prototype.emit=function(t,e,i,s,n,a){var u=r?r+t:t;if(!this._events[u])return!1;var o,l,c=this._events[u],h=arguments.length;if(c.fn){switch(c.once&&this.removeListener(t,c.fn,void 0,!0),h){case 1:return c.fn.call(c.context),!0;case 2:return c.fn.call(c.context,e),!0;case 3:return c.fn.call(c.context,e,i),!0;case 4:return c.fn.call(c.context,e,i,s),!0;case 5:return c.fn.call(c.context,e,i,s,n),!0;case 6:return c.fn.call(c.context,e,i,s,n,a),!0}for(l=1,o=new Array(h-1);l<h;l++)o[l-1]=arguments[l];c.fn.apply(c.context,o)}else{var d,f=c.length;for(l=0;l<f;l++)switch(c[l].once&&this.removeListener(t,c[l].fn,void 0,!0),h){case 1:c[l].fn.call(c[l].context);break;case 2:c[l].fn.call(c[l].context,e);break;case 3:c[l].fn.call(c[l].context,e,i);break;case 4:c[l].fn.call(c[l].context,e,i,s);break;default:if(!o)for(d=1,o=new Array(h-1);d<h;d++)o[d-1]=arguments[d];c[l].fn.apply(c[l].context,o)}}return!0},o.prototype.on=function(t,e,i){return a(this,t,e,i,!1)},o.prototype.once=function(t,e,i){return a(this,t,e,i,!0)},o.prototype.removeListener=function(t,e,i,s){var n=r?r+t:t;if(!this._events[n])return this;if(!e)return u(this,n),this;var a=this._events[n];if(a.fn)a.fn!==e||s&&!a.once||i&&a.context!==i||u(this,n);else{for(var o=0,l=[],c=a.length;o<c;o++)(a[o].fn!==e||s&&!a[o].once||i&&a[o].context!==i)&&l.push(a[o]);l.length?this._events[n]=1===l.length?l[0]:l:u(this,n)}return this},o.prototype.removeAllListeners=function(t){var e;return t?(e=r?r+t:t,this._events[e]&&u(this,e)):(this._events=new n,this._eventsCount=0),this},o.prototype.off=o.prototype.removeListener,o.prototype.addListener=o.prototype.on,o.prefixed=r,o.EventEmitter=o,t.exports=o},function(t,e,i){"use strict";var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}},r=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)Object.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});const n=s(i(4));e.Eventable=n.default;const a=s(i(3));e.XethyaObject=a.default;const u=s(i(0));e.assert=u.default;const o=s(i(13));e.Range=o.default;const l=s(i(25));e.AbstractCollection=l.default;const c=s(i(2));e.Collection=c.default;const h=r(i(6));e.BlumBlumShub=h;const d=r(i(31));e.MersenneTwister=d;const f=s(i(24));e.Randomizer=f.default;const _=i(12);e.Dice=_.Dice;const m=i(23);e.DiceThrow=m.DiceThrow;const v=i(11);e.ChanceThrow=v.ChanceThrow;const g=s(i(10));e.ChanceThrowResult=g.default;const p=s(i(21));e.SkillThrow=p.default;const b=i(20);e.SkillThrowResult=b.SkillThrowResult;const y=i(30);e.CoinFlip=y.CoinFlip;const M=i(19);e.AbstractEntity=M.AbstractEntity;const S=s(i(18));e.Entity=S.default;const A=i(17);e.AbleEntity=A.AbleEntity;const w=i(29);e.LivingEntity=w.LivingEntity;const T=i(28);e.Race=T.Race;const R=s(i(8));e.Modifier=R.default;const x=s(i(16));e.BaseModifier=x.default;const E=i(15);e.BaseModifierCalculator=E.BaseModifierCalculator;const O=s(i(5));e.ModifierCollection=O.default;const k=i(14);e.Attribute=k.Attribute;const P=s(i(1));e.AttributeCollection=P.default;const j=s(i(27));e.Stat=j.default;const V=s(i(7));e.StatCollection=V.default;const D=i(26);e.Skill=D.Skill;const N=s(i(9));e.SkillCollection=N.default}]);
//# sourceMappingURL=xethya.js.map