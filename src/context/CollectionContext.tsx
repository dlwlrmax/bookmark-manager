import { createContext } from 'react';
interface COLLECTION {
    collection: string;
    setCollection: (value: any) => void;
}
const CollectionContext = createContext<COLLECTION>({
    collection: '',
    setCollection: () => {},
});
export default CollectionContext;
