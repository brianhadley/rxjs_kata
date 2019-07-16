import { FeatureRequest } from './feature-request';

export class FeatureReport {
    constructor(issues,urgent,complexity){
        this.NumberIssues = issues;
        this.NumberHighComplexity = complexity;
        this.NumberUrgent = urgent;
    }
    NumberIssues: number;
    NumberUrgent: number;
    NumberHighComplexity: number;

    accumulateItem(request:FeatureRequest) {
        if (request.complexity>=7) {
            this.NumberHighComplexity++;
        }

        if (request.priority>10) {
            this.NumberUrgent++;
        }

        this.NumberIssues++;
    }
}