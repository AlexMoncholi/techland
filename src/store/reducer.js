import * as actionTypes from './actions';

const initialState = {
    cityMap: [],
    player: [],
    stats: {
        id: null,
        incomes: [],
        outcomes: [],
        employees: [],
        offices: [],
        works: []
    },
    mailsList: [],
    game: {
        resources: []
    }
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SELECT_CITY:
            return {
                ...state,
                cityMap: action.cityData
            };
        case actionTypes.SELECT_OFFICE:
            const visible = state.cityMap[action.index].cardVisible;
            (state.cityMap).map((office, index) => {
                office.cardVisible = false;
                return false
            })
            state.cityMap[action.index].cardVisible = visible;
            return {
                ...state,
                cityMap: [
                  ...state.cityMap,
                ]
            }
        case actionTypes.LOAD_STATS:
            return {
                ...state,
                stats: {
                    ...state.stats,
                    id: action.officeData.id,
                    incomes: action.officeData.incomes,
                    outcomes: action.officeData.outcomes,
                }
            };
        case actionTypes.LOAD_MAILS:
            return {
                ...state,
                mailsList: action.mails
            };
        case actionTypes.LOAD_EMPLOYEES_RESOURCES:
            return {
                ...state,
                stats: {
                    ...state.stats,
                    employees: action.employees
                }
            };
        case actionTypes.LOAD_OFFICE_WORKS:
                return {
                    ...state,
                    stats: {
                        ...state.stats,
                        works: action.works
                    }
                };    
        case actionTypes.LOAD_OFFICE_RESOURCES:
            let officeResourcesListCopy = state.stats.offices.slice(0)
            officeResourcesListCopy[action.offices.id] = action.offices
            return {
                ...state,
                stats: {
                    ...state.stats,
                    offices: officeResourcesListCopy
                }
            };
        case actionTypes.LOAD_GENERAL_OFFICE_RESOURCES:
            return {
                ...state,
                game: {
                    ...state.game,
                    resources: action.resources
                }
            };
        case actionTypes.ADD_OFFICE_RESOURCES:
            return {
                ...state,
                stats: {
                    ...state.stats,
                    offices: action.offices
                }
            };
        case actionTypes.REMOVE_EMPLOYEE_FROM_WORKPLACE:
            return {
                ...state,
                stats: {
                    ...state.stats,
                    offices: action.officesList
                }
            };
        default:
            return state;
    }
};

export default reducer;