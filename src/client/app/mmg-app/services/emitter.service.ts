import { Injectable }   from '@angular/core';
import { EventEmitter } from '@angular/core';

/**
 * That's just an event emitter, decorated to be a service.
 * That's really low level, so this class is basically a
 * wrapper to make it work like a classical javascript emitter.
 */
@Injectable()
export class EmitterService {
  
  /**
   * The map of all the current event emitters.
   * There will be one emitter per eventID.
   */
  protected emitters: {[id: string]: EventEmitter<any>} = {};
  
  /**
   * The map of all the events that have been emitted
   * but for which no handler was set.
   */
  protected orphanEvents: {[id: string]: any[]}= {};
  
  /**
   * Emits an event identified by the string key,
   * with the optional parameter value.
   * If no value is provided, the value is set to the key.
   * If no current emitter is able to fire this event,
   * (i.e. there is no emitter with the id key)
   * a new one is created and added to this.emitters.
   * If there isn't any handler for this events
   * and that the boolean storeIt is true (false by default)
   * this method stores the event and the associated value
   * into this.orphanEvents.
   * @param key The event's ID.
   * @param value An optional value associated to the event to emit.
   * @param storeIt Whether or not the event must be stored if no handler is set.
   *                False by default.
   */
  public emit(key: string, value?: any, storeIt: boolean = false): void {
    value = value ? value : key;
    if(!this.emitters[key] || this.emitters[key].observers.length === 0) {  // NOTE: this.emitters[key].isUnsubscribed is false even when observers.length is set to 0
      this.emitters[key] = new EventEmitter<any>();
      if(storeIt) {
        if(!this.orphanEvents[key]) {
          this.orphanEvents[key] = [];
        }
        this.orphanEvents[key].push(value);
      }
    } else {
      this.emitters[key].emit(value);
    }
  }
  
  /**
   * Registers a handler for the event identified by
   * the string key.
   * If no emitter is able to handle the given event,
   * (i.e. there is no emitter with the id key)
   * a new one is created and added to this.emitters.
   * This handler will be called each time the event key
   * is received.
   * If there was some event based on key that were fired
   * before any handler was set, this method fire them
   * again and then delete them from this.orphanEvents.
   */
  public on(key: string, todo: (emitted: any) => any) {
    if(!this.emitters[key]) {
      this.emitters[key] = new EventEmitter<any>();
    }
    this.emitters[key].subscribe(todo);
    if(this.orphanEvents[key]) {
      for(let value of this.orphanEvents[key]) {
        this.emit(key, value);
      }
      delete this.orphanEvents[key];
    }
  }
}
