/**
 * Subscribable timer/interval state
 */
export class TimerState {
    #initial;
    #current = $state(null);
    #intervalId = null;
    #delay;
    #disabled;
    #running = $state(false);
    #tick;
    constructor(options = {}) {
        this.#initial = options.initial ?? null;
        this.#current = this.#initial;
        this.#delay = options.delay ?? 1000;
        this.#disabled = options.disabled ?? false;
        this.#tick = options.tick ?? (() => new Date());
        if (!this.#disabled) {
            this.start();
        }
        $effect(() => {
            return this.stop;
        });
    }
    get current() {
        return this.#current;
    }
    set current(value) {
        if (!this.#disabled) {
            this.start();
        }
        this.#current = value;
    }
    get delay() {
        return this.#delay;
    }
    set delay(value) {
        const isRunning = this.#running;
        this.stop();
        this.#delay = value;
        if (isRunning) {
            // Restart if was running
            this.start();
        }
    }
    start = () => {
        stop();
        this.#intervalId = setInterval(() => {
            this.#current = this.#tick(this.#current) ?? new Date();
        }, this.#delay);
        this.#running = true;
    };
    stop = () => {
        if (this.#intervalId) {
            clearInterval(this.#intervalId);
        }
        this.#intervalId = null;
        this.#running = false;
    };
    reset = () => {
        return (this.#current = this.#initial);
    };
    get running() {
        return this.#running;
    }
}
