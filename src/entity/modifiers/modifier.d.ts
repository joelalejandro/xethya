import Eventable from '../../base/eventable';
export default class Modifier extends Eventable {
    private _id;
    private _value;
    private _active;
    private _source;
    constructor(id: string, value?: number, source?: any);
    id: string;
    active: boolean;
    value: number;
    source: any;
}
