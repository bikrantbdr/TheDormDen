class QueryHandler {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString
    }

    search() {
        const keyword = this.queryString.keyword ? {
            name: {
                $regex: this.queryString.keyword,
                $options: 'i'
            }
        } : {}
        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryFiltered = { ...this.queryString };
        const removeFields = ['keyword', 'limit', 'page'];

        removeFields.forEach(param => delete queryFiltered[param]);
        this.queryString = JSON.stringify(queryFiltered);

        this.queryString = this.queryString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
        this.query = this.query.find(JSON.parse(this.queryString));
        return this;
    }
}

module.exports = QueryHandler;