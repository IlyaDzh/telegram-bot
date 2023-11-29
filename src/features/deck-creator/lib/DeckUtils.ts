interface GetDataByKeyFunction<T> {
    (...keys: any[]): Promise<T | null>;
}

export class DeckUtils {
    static fetchDataFromIndexedDB = async <T>(
        getDataByKeyFunction: GetDataByKeyFunction<unknown>,
        keys: any[],
        setValueFunction: (data: T) => void,
    ) => {
        try {
            const data = (await getDataByKeyFunction(...keys)) as T;

            if (data) {
                setValueFunction(data);
            }
        } catch (error) {
            console.error('Error fetching data from IndexedDB:', error);
        }
    };
}
