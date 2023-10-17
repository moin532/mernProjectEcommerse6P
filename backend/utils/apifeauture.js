class Apifeautures {
    constructor(query,querystr){
        this.query = query;
        this.querystr = querystr;
    }

    //search feauture
    search(){
    const keyword = this.querystr.keyword ? {
        name:{
            $regex:this.querystr.keyword,
            $options: 'i', //casesenstive
        }
    } : {};

    // console.log(keyword)

    this.query = this.query.find({...keyword});
    return this;
    }

    filter(){
        const queryCopy = {...this.querystr};
       
        //removing some field category copy
        const removeFields = ["keyword","page","limit"];

        removeFields.forEach((key)=> delete queryCopy[key]);

        //filter pricing and ratings

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key=>`$${key}`) //regular expression

        //after convert obj use parse
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

 
    pagination(resultPerPage) {
        const currentPage = Number(this.querystr.page) || 1;
    
        const skip = resultPerPage * (currentPage - 1);
    
        this.query = this.query.limit(resultPerPage).skip(skip);
    
        return this;
      }
}

module.exports = Apifeautures