export const indexedDb = (function () {
    const DB_NAME = 'deck-creator';
    const OBJECT_STORE = 'deck';

    function open(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const dbRequest = indexedDB.open(DB_NAME, 1);

            dbRequest.onerror = function (event) {
                reject(Error('Error text'));
            };

            dbRequest.onupgradeneeded = function (event) {
                const db = dbRequest.result;
                const store = db.createObjectStore(OBJECT_STORE, {
                    autoIncrement: true,
                });
            };

            dbRequest.onsuccess = function (event) {
                const db = dbRequest.result;
                resolve(db);
            };
        });
    }

    async function addData(key: IDBValidKey, data: any) {
        const db = await open();
        const transaction = db.transaction(OBJECT_STORE, 'readwrite');
        const store = transaction.objectStore(OBJECT_STORE);
        const query = store.put(data, key);

        return new Promise((resolve, reject) => {
            query.onsuccess = () => {
                resolve(query.result);
            };
            query.onerror = () => {
                reject(query.error);
            };
        });
    }

    async function getDataByKey(key: IDBValidKey) {
        const db = await open();
        const transaction = db.transaction(OBJECT_STORE, 'readwrite');
        const store = transaction.objectStore(OBJECT_STORE);
        const query = store.get(key);

        return new Promise((resolve, reject) => {
            query.onsuccess = () => {
                resolve(query.result);
            };
            query.onerror = () => {
                reject(query.error);
            };
        });
    }

    async function getAll() {
        const db = await open();
        const transaction = db.transaction(OBJECT_STORE, 'readonly');
        const store = transaction.objectStore(OBJECT_STORE);
        const query = store.getAll();

        return new Promise((resolve, reject) => {
            query.onsuccess = () => {
                resolve(query.result);
            };
            query.onerror = () => {
                reject('error');
            };
        });
    }

    async function deleteAll() {
        const db = await open();
        const transaction = db.transaction(OBJECT_STORE, 'readwrite');
        const store = transaction.objectStore(OBJECT_STORE);
        const query = store.clear();
        return new Promise((resolve, reject) => {
            query.onsuccess = () => {
                resolve(query.result);
            };
            query.onerror = () => {
                reject('error');
            };
        });
    }

    return {
        addData,
        getDataByKey,
        getAll,
        deleteAll,
    };
})();
