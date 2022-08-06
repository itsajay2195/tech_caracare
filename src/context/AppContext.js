import { createContext } from 'react';
const CharacterContext = createContext();

export const CharacterProvider = ({children})=>{
    return <CharacterContext.Provider>
        {children}
    </CharacterContext.Provider>
}