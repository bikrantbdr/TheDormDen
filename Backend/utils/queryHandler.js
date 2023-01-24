class QueryHandler {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString
    }

    search() {
        const name = this.queryString.name ? {
            name: {
                $regex: this.queryString.name,
                $options: 'i'
            }
        } : {}
        this.query = this.query.find({ ...name });
        return this;
    }

    filter() {
        const queryFiltered = { ...this.queryString };
        const removeFields = ['name', 'limit', 'page'];

        removeFields.forEach(param => delete queryFiltered[param]);
        
        let room_type_query = []
        if (true) {
            this.queryString["room_types"].forEach(room_type => {
                switch(room_type){
                    case 'one_seater':
                        room_type_query.push({"rooms.room_type": "one_seater"})
                        break;
                    case 'two_seater':
                        room_type_query.push({"rooms.room_type": "two_seater"})
                        break;
                    case 'three_seater':
                        room_type_query.push({"rooms.room_type": "three_seater"})
                        break;
                    case 'four_seater':
                        room_type_query.push({"rooms.room_type": "four_seater"})
                        break;
                    default:
                        break;
                }
            })
        }
        let pricing_query = []
        if (this.queryString["price_upper"] && this.queryString["price_lower"]) {
            pricing_query.push({"rooms.price": {$gte: this.queryString["price_lower"]}})
            pricing_query.push({"rooms.price": {$lte: this.queryString["price_upper"]}})
        }
        this.query = this.query.find({$and: [{$or: room_type_query},
                                             {"rooms.availability": true},
                                             {$and: pricing_query}
                                            ]});
        //console.log(this.query, room_type_query);
        return this;
    }

    sort() {
        console.log(this.query)
        this.query = this.query.sort({ ranking: -1 });
        return this;
    }

    pagination(results_per_page) {
        const currentPage = Number(this.queryString.page) || 1;
        const skip = results_per_page * (currentPage - 1);
        this.query = this.query.limit(results_per_page).skip(skip);
        return this;
    }
}

module.exports = QueryHandler;