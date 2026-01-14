import { useState } from 'react';

export type FormData = {
    name: string;
    birthDate: string;
    birthTime: string;
    birthPlace: string;
    bloodType: string;
    gender: string;
};

type Props = {
    onSubmit: (data: FormData) => void;
    isLoading: boolean;
};

export default function FortuneForm({ onSubmit, isLoading }: Props) {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        birthDate: '',
        birthTime: '',
        birthPlace: '',
        bloodType: 'A',
        gender: 'female' // Default
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="ai-card max-w-2xl mx-auto">
            <h2 className="text-xl font-medium mb-6 pb-4 border-b border-[#444746]" style={{ color: 'var(--text-primary)' }}>
                Enter Your Details
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                    <div className="input-group">
                        <label className="input-label">Name (氏名)</label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="ai-input"
                            placeholder="山田 花子"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Gender (性別)</label>
                        <select
                            name="gender"
                            className="ai-input"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Birth Date (生年月日)</label>
                        <input
                            type="date"
                            name="birthDate"
                            required
                            className="ai-input"
                            value={formData.birthDate}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Birth Time (出生時間 - Optional)</label>
                        <input
                            type="time"
                            name="birthTime"
                            className="ai-input"
                            value={formData.birthTime}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Birth Place (出生地)</label>
                        <input
                            type="text"
                            name="birthPlace"
                            className="ai-input"
                            placeholder="Tokyo, Japan"
                            value={formData.birthPlace}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Blood Type (血液型)</label>
                        <select
                            name="bloodType"
                            className="ai-input"
                            value={formData.bloodType}
                            onChange={handleChange}
                        >
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="O">O</option>
                            <option value="AB">AB</option>
                        </select>
                    </div>
                </div>

                <div className="pt-4 text-right">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn-primary"
                    >
                        {isLoading ? 'Processing...' : 'Generate Reading'}
                    </button>
                </div>
            </form>
        </div>
    );
}
