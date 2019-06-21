export declare class AventFilter<E> {
    private readonly filter;
    constructor(filter: (avent: E) => boolean);
    verify(avent: E): boolean;
}
