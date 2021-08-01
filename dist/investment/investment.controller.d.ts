import { RespData } from 'src/auth/interfaces/response.interface';
import { InvestmentService } from './investment.service';
export declare class InvestmentController {
    private readonly investmentServices;
    constructor(investmentServices: InvestmentService);
    fetchUserInvestment(request: any): Promise<RespData>;
}
