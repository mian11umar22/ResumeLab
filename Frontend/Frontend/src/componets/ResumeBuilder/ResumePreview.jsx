import ClassicTemplate from './templates/ClassicTemplate';
import ModernTemplate from './templates/ModernTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';

function ResumePreview({ resume }) {
    const templates = {
        classic: ClassicTemplate,
        modern: ModernTemplate,
        professional: ProfessionalTemplate,
        minimal: MinimalTemplate,
        executive: ExecutiveTemplate
    };

    const Template = templates[resume?.templateId] || ClassicTemplate;

    return (
        <div className="resume-preview">
            <div 
                id="resume-preview"
                className="bg-white shadow-2xl mx-auto print:shadow-none print:mx-0" 
                style={{ 
                    width: '210mm', 
                    minHeight: '297mm',
                    maxWidth: '100%'
                }}
            >
                <Template resume={resume} />
            </div>
        </div>
    );
}

export default ResumePreview;
