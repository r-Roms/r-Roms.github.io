export declare class Context<TContext> {
    #private;
    /**
     * @param name The name of the context.
     * This is used for generating the context key and error messages.
     */
    constructor(name: string);
    /**
     * The key used to get and set the context.
     *
     * It is not recommended to use this value directly.
     * Instead, use the methods provided by this class.
     */
    get key(): symbol;
    /**
     * Checks whether this has been set in the context of a parent component.
     *
     * Must be called during component initialisation.
     */
    exists(): boolean;
    /**
     * Retrieves the context that belongs to the closest parent component.
     *
     * Must be called during component initialisation.
     *
     * @throws An error if the context does not exist.
     */
    get(): TContext;
    /**
     * Retrieves the context that belongs to the closest parent component,
     * or the given fallback value if the context does not exist.
     *
     * Must be called during component initialisation.
     */
    getOr<TFallback>(fallback: TFallback): TContext | TFallback;
    /**
     * Associates the given value with the current component and returns it.
     *
     * Must be called during component initialisation.
     */
    set(context: TContext): TContext;
}
