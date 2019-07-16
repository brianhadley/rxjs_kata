export enum FeatureStatus {Requested, ReadyForRelease, Released}

export class FeatureRequest {
    constructor(id: number, featureName:string, complexity: number, priority:number) {
        this.id = id;
        this.complexity = complexity;
        this.remainingComplexity = complexity;
        this.featureName = featureName;
        this.priority = priority;
    }

    public id: number;
    public featureName: string;
    public complexity: number;
    public priority: number;
    public status: FeatureStatus = FeatureStatus.Requested;
    public remainingComplexity: number;
}