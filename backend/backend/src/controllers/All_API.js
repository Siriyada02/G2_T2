const connection = require("../services/database");  

const API1_2 = async (req, res,next) => {
    const STORE_CD = req.query.STORE_CD
    const PROD_CD = req.query.PROD_CD
    const EX_TO = req.query.Currency
    const Date = req.query.Date

    const [all] = await connection.query(`select distinct a.PROD_CD as PRODUCT_CODE, b.PROD_NAME as PRODUCT_NAME, a.PACKING_SIZE as PACKAGE_SIZE, convert(a.PROD_RETAIL,decimal(18,4)) as PRODUCT_RETAIL_USD, 
        convert(a.PROD_RETAIL*c.RATE_AMT,decimal(18,4)) as PRODUCT_RETAIL_THB, convert(a.PROD_RETAIL*d.RATE_AMT,decimal(18,4)) as PRODUCT_RETAIL_Currency,convert(d.RATE_AMT,decimal(18,4)) AS USDtoCurrency,convert(c.RATE_AMT,decimal(18,4)) AS USDtoTHB
        from t_prod_retail_mast a left join t_prod_mast b on a.PROD_CD = b.PROD_CD join t_exchange_rate c on 1=1 
        and c.ex_to="THB" and c.STORE_CD="${STORE_CD}" and "${Date}" between c.start_dt and c.end_dt
        join t_exchange_rate d on 1=1 
        and d.ex_to="${EX_TO}" and d.STORE_CD="${STORE_CD}" and "${Date}" between d.start_dt and d.end_dt
        where a.PROD_CD = ${PROD_CD}`)

        res.status(200).json(all)
}
const API3 = async (req, res,next) => {
    const STORE_CD = req.query.STORE_CD
    const PROD_CD = req.query.PROD_CD
    const EX_TO = req.query.Currency

    const [all] = await connection.query(`SELECT distinct h.PRODUCT_CODE,pm.PROD_NAME AS PRODUCT_NAME,h.PACKAGE_SIZE,h.PRODUCT_RETAIL_USD,convert(h.PRODUCT_RETAIL_THB,decimal(18,4)) AS PRODUCT_RETAIL_THB,h.RATE_1_USD_THB,convert(h.PRODUCT_RETAIL_Currency,decimal(18,4))AS PRODUCT_RETAIL_Currency ,convert(h.RATE_1_USD_Currency,decimal(18,4))As RATE_1_USD_Currency,h.EX_TO,DATE_FORMAT(h.CREATE_DATE, '%d/%m/%Y %H:%i') as CREATE_DATE FROM t_history h join t_exchange_rate s on s.EX_TO = h.EX_TO join t_prod_mast pm on pm.PROD_CD = h.PRODUCT_CODE  where h.EX_TO ="${EX_TO}" AND h.PRODUCT_CODE = ${PROD_CD} AND s.STORE_CD = ${STORE_CD}`)

        res.status(200).json(all)
}

const API4 = async (req, res,next) => {
    const STORE_CD = req.body.STORE_CD
    const PROD_CD = req.body.PROD_CD
    const EX_TO = req.body.Currency
    const Date = req.body.Date

    const [all] = await connection.query(`insert into t_history (STORE_CODE,PRODUCT_CODE, PRODUCT_NAME, PACKAGE_SIZE, PRODUCT_RETAIL_USD, PRODUCT_RETAIL_THB, PRODUCT_RETAIL_Currency,RATE_1_USD_Currency,RATE_1_USD_THB,EX_TO)
    select distinct d.STORE_CD,a.PROD_CD as PRODUCT_CODE, b.PROD_NAME as PRODUCT_NAME, a.PACKING_SIZE as PACKAGE_SIZE, a.PROD_RETAIL as PRODUCT_RETAIL_USD,
    a.PROD_RETAIL*c.RATE_AMT as PRODUCT_RETAIL_THB, a.PROD_RETAIL*d.RATE_AMT as PRODUCT_RETAIL_Currency,d.RATE_AMT AS RATE_1_USD_Currency,c.RATE_AMT AS RATE_1_USD_THB,d.EX_TO
    from t_prod_retail_mast a left join t_prod_mast b on a.PROD_CD = b.PROD_CD join t_exchange_rate c on 1=1 
    and c.ex_to="THB" and c.STORE_CD="${STORE_CD}" and "${Date}" between c.start_dt and c.end_dt
    join t_exchange_rate d on 1=1 
    and d.ex_to="${EX_TO}" and d.STORE_CD="${STORE_CD}" and "${Date}" between d.start_dt and d.end_dt
    where a.PROD_CD = ${PROD_CD}`)

        res.status(200).json("Inserted Complete")
}

module.exports = {API1_2,API3,API4}