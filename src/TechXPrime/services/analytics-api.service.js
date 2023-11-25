import http from "@/shared/services/http-common";

export class AnalyticsApiService {
    getAnalyticsByMonth(month) {
        return Promise.all([
            http.get(`month/${month}/analytics`)
        ]).then(analyticsResponse => {
            let data = {};
            analyticsResponse[0].data.forEach(item => {
                data[item.week] = {
                    incomes: item.incomes,
                    expenses: item.expenses,
                    profit: item.profits
                };
            });
            return {
                data
            };
        })
    }
}