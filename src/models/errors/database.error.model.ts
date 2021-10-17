class DatabaseError extends Error { 

    constructor(
        public message: string,
        public error?: string,
     
    ) {
        super(message);
    }

} export default DatabaseError;