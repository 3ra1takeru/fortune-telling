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
                基本情報の入力
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div className="input-group">
                        <label className="input-label">お名前</label>
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
                        <label className="input-label">性別</label>
                        <select
                            name="gender"
                            className="ai-input"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value="female">女性</option>
                            <option value="male">男性</option>
                            <option value="other">その他</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label className="input-label">生年月日</label>
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
                        <label className="input-label">出生時間 (不明な場合は空欄)</label>
                        <input
                            type="time"
                            name="birthTime"
                            className="ai-input"
                            value={formData.birthTime}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">出生地 (都道府県/都市)</label>
                        <input
                            type="text"
                            name="birthPlace"
                            className="ai-input"
                            placeholder="東京都 千代田区"
                            value={formData.birthPlace}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">血液型</label>
                        <select
                            name="bloodType"
                            className="ai-input"
                            value={formData.bloodType}
                            onChange={handleChange}
                        >
                            <option value="A">A型</option>
                            <option value="B">B型</option>
                            <option value="O">O型</option>
                            <option value="AB">AB型</option>
                        </select>
                    </div>
                </div>

                <div className="pt-6 text-right">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn-primary"
                    >
                        {isLoading ? '解析中...' : '鑑定する'}
                    </button>
                </div>
            </form>
        </div>
    );
}
