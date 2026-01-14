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
        <div className="glass-panel p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl mb-8 text-center border-b border-gray-700 pb-4">
                Enter Your Details
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm text-gray-400">Name (氏名)</label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="input-field"
                            placeholder="山田 花子"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm text-gray-400">Gender (性別)</label>
                        <select
                            name="gender"
                            className="input-field bg-transparent"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value="female" className="text-black">Female</option>
                            <option value="male" className="text-black">Male</option>
                            <option value="other" className="text-black">Other</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm text-gray-400">Birth Date (生年月日)</label>
                        <input
                            type="date"
                            name="birthDate"
                            required
                            className="input-field"
                            value={formData.birthDate}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm text-gray-400">Birth Time (出生時間 - Unknown OK)</label>
                        <input
                            type="time"
                            name="birthTime"
                            className="input-field"
                            value={formData.birthTime}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm text-gray-400">Birth Place (出生地)</label>
                        <input
                            type="text"
                            name="birthPlace"
                            className="input-field"
                            placeholder="Tokyo, Japan"
                            value={formData.birthPlace}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm text-gray-400">Blood Type (血液型)</label>
                        <select
                            name="bloodType"
                            className="input-field bg-transparent"
                            value={formData.bloodType}
                            onChange={handleChange}
                        >
                            <option value="A" className="text-black">A</option>
                            <option value="B" className="text-black">B</option>
                            <option value="O" className="text-black">O</option>
                            <option value="AB" className="text-black">AB</option>
                        </select>
                    </div>
                </div>

                <div className="pt-6 text-center">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`btn-primary w-full md:w-1/2 text-lg ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? 'Divining Stars...' : 'Reveal Fortune'}
                    </button>
                </div>
            </form>
        </div>
    );
}
