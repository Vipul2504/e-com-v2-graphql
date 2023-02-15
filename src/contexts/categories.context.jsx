import { gql, useQuery } from '@apollo/client';
import { createContext, useEffect, useState} from 'react';



export const CategoriesContext = createContext({
  categoriesMap: {},
});

const COLLECTIONS = gql`
  query getCollections{
    collections{
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`





export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  const {loading, error, data} = useQuery(COLLECTIONS)

  useEffect(()=> {
    if(data){
      const {collections} = data;
      const collectionMap = collections.reduce((acc, collection) => {
        const {title, items} = collection;
        acc[title.toLowerCase()] = items;
        return acc;
      },{})
        setCategoriesMap(collectionMap)
    }
  },[data])
  const value = { categoriesMap, loading };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
