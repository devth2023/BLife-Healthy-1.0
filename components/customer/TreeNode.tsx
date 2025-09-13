import React, { useState } from 'react';
import { DownlineMember } from '../../types';

const StatIcon = ({ d }: { d: string }) => (
    <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={d}></path>
    </svg>
);

const TreeNode: React.FC<{ member: DownlineMember }> = ({ member }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = member.children && member.children.length > 0;

    return (
        <div className="pl-4 border-l-2 border-gray-200">
            <div className="relative my-2 p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-brand-green-light transition-colors">
                 {/* Vertical line connector */}
                <div className="absolute -left-4 top-8 h-px w-3 bg-gray-200"></div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        {hasChildren && (
                            <button onClick={() => setIsOpen(!isOpen)} className="mr-2 p-1 rounded-full hover:bg-gray-100 focus:outline-none">
                                <svg className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </button>
                        )}
                        {!hasChildren && <div className="w-8 mr-2"></div>}
                        
                        <img 
                            src={`https://picsum.photos/seed/${member.id}/40`} 
                            alt={member.name}
                            className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                            <p className="font-bold text-gray-800">{member.name}</p>
                            <p className="text-xs text-gray-500">Joined: {member.joinDate}</p>
                        </div>
                    </div>
                    <div className="hidden sm:flex items-center space-x-4 text-sm text-gray-700">
                        <div className="flex items-center" title="Downline Members">
                             <StatIcon d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 21a6 6 0 006-5.197M12 12a4 4 0 110-8 4 4 0 010 8z" />
                            <span className="font-semibold">{member.downlineCount}</span>
                        </div>
                        <div className="flex items-center" title="Total Team PV">
                             <StatIcon d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m0 10l8 4m0 0l8-4m-8 4V7" />
                            <span className="font-semibold text-blue-600">{member.totalPV.toLocaleString()}</span>
                        </div>
                         <div className="flex items-center" title="Total Team Commission">
                             <StatIcon d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" />
                            <span className="font-semibold text-green-600">฿{member.totalCommission.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            {isOpen && hasChildren && (
                <div className="mt-2">
                    {member.children.map(child => (
                        <TreeNode key={child.id} member={child} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TreeNode;
