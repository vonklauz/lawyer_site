import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { Entities, EntitiesState, EntityItem } from './models';

const getDefaultEntitites = () => ({
    individual: [],
    sole_proprietor: [],
    company: [],
})

export const isEmptyEntities = (entities: Entities): boolean => Object.values(entities).every((value) => value.length === 0);

const useEntitiesStore = create<EntitiesState>()(
    immer(
        persist(
            devtools((set) => ({
                entities: getDefaultEntitites(),
                chosenEntity: null,
                setEntities: (newEntities: Entities) => set({ entities: { ...newEntities } }),
                clearEntities: () => set({
                    entities: getDefaultEntitites(),
                    chosenEntity: null,
                }),
                addEntity: (entity: EntityItem, key: keyof Entities) =>
                    set((state) => ({
                        entities: {
                            ...state.entities,
                            [key]: [
                                ...state.entities[key],
                                entity,
                            ],
                        },
                    })),
                chooseEntity: (item: EntityItem) => set(() => ({ chosenEntity: { ...item } })),
                hasHydrated: false,
                setHasHydrated: (state: boolean) => set({ hasHydrated: state }),
            })),
            {
                name: 'entities-storage',
                onRehydrateStorage: () => (state) => {
                    state?.setHasHydrated(true);
                },
            }
        )
    )
);

export default useEntitiesStore;