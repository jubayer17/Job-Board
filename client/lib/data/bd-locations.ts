export type Upazila = {
    name: string;
};

export type District = {
    name: string;
    upazilas: Upazila[];
};

export type Division = {
    name: string;
    districts: District[];
};

export const BD_DIVISIONS: Division[] = [
    {
        name: "Dhaka",
        districts: [
            {
                name: "Dhaka",
                upazilas: [
                    { name: "Dhamrai" },
                    { name: "Dohar" },
                    { name: "Keraniganj" },
                    { name: "Nawabganj" },
                    { name: "Savar" },
                ],
            },
            {
                name: "Gazipur",
                upazilas: [
                    { name: "Gazipur Sadar" },
                    { name: "Kaliakair" },
                    { name: "Kaliganj" },
                    { name: "Kapasia" },
                    { name: "Sreepur" },
                ],
            },
            {
                name: "Narayanganj",
                upazilas: [
                    { name: "Araihazar" },
                    { name: "Bandar" },
                    { name: "Narayanganj Sadar" },
                    { name: "Rupganj" },
                    { name: "Sonargaon" },
                ],
            },
        ],
    },
    {
        name: "Chittagong",
        districts: [
            {
                name: "Chattogram",
                upazilas: [
                    { name: "Anwara" },
                    { name: "Boalkhali" },
                    { name: "Chandanaish" },
                    { name: "Fatikchhari" },
                    { name: "Hathazari" },
                ],
            },
            {
                name: "Cox's Bazar",
                upazilas: [
                    { name: "Chakaria" },
                    { name: "Cox's Bazar Sadar" },
                    { name: "Kutubdia" },
                    { name: "Maheshkhali" },
                    { name: "Ukhia" },
                ],
            },
        ],
    },
    {
        name: "Rajshahi",
        districts: [
            {
                name: "Rajshahi",
                upazilas: [
                    { name: "Bagha" },
                    { name: "Bagmara" },
                    { name: "Charghat" },
                    { name: "Durgapur" },
                    { name: "Paba" },
                ],
            },
            {
                name: "Pabna",
                upazilas: [
                    { name: "Atgharia" },
                    { name: "Bera" },
                    { name: "Bhangura" },
                    { name: "Chatmohar" },
                    { name: "Faridpur" },
                ],
            },
        ],
    },
    {
        name: "Khulna",
        districts: [
            {
                name: "Khulna",
                upazilas: [
                    { name: "Batiaghata" },
                    { name: "Dacope" },
                    { name: "Dighalia" },
                    { name: "Dumuria" },
                    { name: "Koira" },
                ],
            },
            {
                name: "Jessore",
                upazilas: [
                    { name: "Abhaynagar" },
                    { name: "Bagherpara" },
                    { name: "Chaugachha" },
                    { name: "Jhikargachha" },
                    { name: "Keshabpur" },
                ],
            },
        ],
    },
    {
        name: "Barishal",
        districts: [
            {
                name: "Barishal",
                upazilas: [
                    { name: "Barishal Sadar" },
                    { name: "Babuganj" },
                    { name: "Bakerganj" },
                    { name: "Banaripara" },
                    { name: "Gournadi" },
                ],
            },
            {
                name: "Bhola",
                upazilas: [
                    { name: "Bhola Sadar" },
                    { name: "Borhanuddin" },
                    { name: "Lalmohan" },
                    { name: "Char Fasson" },
                    { name: "Daulatkhan" },
                    { name: "Tajumuddin" },
                    { name: "Manpura" },
                ],
            },
        ],
    },
    {
        name: "Sylhet",
        districts: [
            {
                name: "Sylhet",
                upazilas: [
                    { name: "Balaganj" },
                    { name: "Beanibazar" },
                    { name: "Bishwanath" },
                    { name: "Companiganj" },
                    { name: "Fenchuganj" },
                ],
            },
            {
                name: "Habiganj",
                upazilas: [
                    { name: "Ajmiriganj" },
                    { name: "Bahubal" },
                    { name: "Baniachong" },
                    { name: "Chunarughat" },
                    { name: "Lakhai" },
                ],
            },
        ],
    },
    {
        name: "Rangpur",
        districts: [
            {
                name: "Rangpur",
                upazilas: [
                    { name: "Badarganj" },
                    { name: "Gangachara" },
                    { name: "Kaunia" },
                    { name: "Mithapukur" },
                    { name: "Taraganj" },
                ],
            },
            {
                name: "Dinajpur",
                upazilas: [
                    { name: "Birampur" },
                    { name: "Birganj" },
                    { name: "Birol" },
                    { name: "Bochaganj" },
                    { name: "Chirirbandar" },
                ],
            },
        ],
    },
    {
        name: "Mymensingh",
        districts: [
            {
                name: "Mymensingh",
                upazilas: [
                    { name: "Bhaluka" },
                    { name: "Dhobaura" },
                    { name: "Fulbaria" },
                    { name: "Gaffargaon" },
                    { name: "Gouripur" },
                ],
            },
            {
                name: "Jamalpur",
                upazilas: [
                    { name: "Baksiganj" },
                    { name: "Dewanganj" },
                    { name: "Islampur" },
                    { name: "Madarganj" },
                    { name: "Melandaha" },
                ],
            },
        ],
    },
];

