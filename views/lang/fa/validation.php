<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */
    // custom
    'not_persian_alpha' => ':attribute باید انگلیسی وارد شود',
    'persian_alpha' => ':attribute باید فارسی وارد شود',
    'melli_code' => 'کد ملی :attribute معتبر نیست',
    'mobile' => ':attribute معتبر نیست',
    // /custom
    'accepted' => ':attribute باید پذیرفته شده باشد.',
    'active_url' => 'آدرس :attribute معتبر نیست',
    'after' => ':attribute باید تاریخی بعد از :date باشد.',
    'alpha' => ':attribute باید شامل حروف الفبا باشد.',
    'alpha_dash' => ':attribute باید شامل حروف الفبا و عدد و خظ تیره(-) باشد.',
    'alpha_num' => ':attribute باید شامل حروف الفبا و عدد باشد.',
    'array' => ':attribute باید شامل آرایه باشد.',
    'before' => ':attribute باید تاریخی قبل از :date باشد.',
    'between' => [
        'numeric' => ':attribute باید بین :min و :max باشد.',
        'file' => ':attribute باید بین :min و :max کیلوبایت باشد.',
        'string' => ':attribute باید بین :min و :max کاراکتر باشد.',
        'array' => ':attribute باید بین :min و :max آیتم باشد.',
    ],
    'boolean' => 'فیلد :attribute فقط میتواند صحیح و یا غلط باشد',
    'confirmed' => ':attribute با تاییدیه مطابقت ندارد.',
    'date' => ':attribute یک تاریخ معتبر نیست.',
    'date_format' => ':attribute با الگوی :format مطاقبت ندارد.',
    'different' => ':attribute و :other باید متفاوت باشند.',
    'digits' => ':attribute باید :digits رقم باشد.',
    'digits_between' => ':attribute باید بین :min و :max رقم باشد.',
    'dimensions' => 'The :attribute has invalid image dimensions.',
    'distinct' => 'فیلد :attribute دارای یک مقدار تکراری می‌باشد.',
    'email' => 'فرمت :attribute معتبر نیست.',
    'exists' => ':attribute انتخاب شده، معتبر نیست.',
    'file' => 'The :attribute must be a file.',
    'filled' => 'فیلد :attribute الزامی است',
    'image' => ':attribute باید تصویر باشد.',
    'in' => ':attribute انتخاب شده، معتبر نیست.',
    'in_array' => 'فیلد :attribute در :other وجود ندارد.',
    'integer' => ':attribute باید نوع داده ای عددی (integer) باشد.',
    'ip' => ':attribute باید IP آدرس معتبر باشد.',
    'json' => 'فیلد :attribute باید یک رشته از نوع JSON باشد.',
    'max' => [
        'numeric' => ':attribute نباید بزرگتر از :max باشد.',
        'file' => ':attribute نباید بزرگتر از :max کیلوبایت باشد.',
        'string' => ':attribute نباید بیشتر از :max کاراکتر باشد.',
        'array' => ':attribute نباید بیشتر از :max آیتم باشد.',
    ],
    'mimes' => ':attribute باید یکی از فرمت های :values باشد.',
    'min' => [
        'numeric' => ':attribute نباید کوچکتر از :min باشد.',
        'file' => ':attribute نباید کوچکتر از :min کیلوبایت باشد.',
        'string' => ':attribute نباید کمتر از :min کاراکتر باشد.',
        'array' => ':attribute نباید کمتر از :min آیتم باشد.',
    ],
    'not_in' => ':attribute انتخاب شده، معتبر نیست.',
    'numeric' => ':attribute باید شامل عدد باشد.',
    'present' => 'فیلد :attribute باید در پارامترهای ارسالی وجود داشته باشد.',
    'regex' => ':attribute یک فرمت معتبر نیست',
    'required' => 'فیلد :attribute الزامی است',
    'required_if' => 'فیلد :attribute هنگامی که :other برابر با :value است، الزامیست.',
    'required_unless' => 'فیلد :attribute ضروری است، مگر آنکه :other در :values وجود داشته باشد.',
    'required_with' => ':attribute الزامی است زمانی که :values موجود است.',
    'required_with_all' => ':attribute الزامی است زمانی که :values موجود است.',
    'required_without' => ':attribute الزامی است زمانی که :values موجود نیست.',
    'required_without_all' => ':attribute الزامی است زمانی که :values موجود نیست.',
    'same' => ':attribute و :other باید مانند هم باشند.',
    'size' => [
        'numeric' => ':attribute باید برابر با :size باشد.',
        'file' => ':attribute باید برابر با :size کیلوبایت باشد.',
        'string' => ':attribute باید برابر با :size کاراکتر باشد.',
        'array' => ':attribute باسد شامل :size آیتم باشد.',
    ],
    'string' => 'فیلد :attribute باید یک String باشد.',
    'timezone' => 'فیلد :attribute باید یک منطقه صحیح باشد.',
    'unique' => ':attribute قبلا انتخاب شده است.',
    'url' => 'فرمت آدرس :attribute اشتباه است.',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        //
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap attribute place-holders
    | with something more reader friendly such as E-Mail Address instead
    | of "email". This simply helps us make messages a little cleaner.
    |
    */

    'attributes' => [
        'name' => 'نام',
        'username' => 'نام کاربری',
        'email' => 'پست الکترونیکی',
        'receipt' => 'شناسه',
        'bank' => 'بانک',
        'payment' => 'پرداخت',
        'first_name' => 'نام',
        'last_name' => 'نام خانوادگی',
        'family' => 'نام خانوادگی',
        'password' => 'رمز عبور',
        'password_confirmation' => 'تاییدیه ی رمز عبور',
        'country' => 'کشور',
        'address' => 'نشانی',
        'info.address' => 'نشانی',
        'info.mobile' => 'تلفن',
        'mobile' => 'تلفن',
        'tel' => 'تلفن',
        'edu' => 'مدرک',
        'info.edu' => 'مدرک',
        'fld' => 'رشته',
        'info.fld' => 'رشته',
        'job' => 'شغل',
        'info.job' => 'شغل',
        'interview_by' => 'مصاحبه کننده',
        'info.interview_by' => 'مصاحبه کننده',
        'info.price' => 'هزینه',
        'price' => 'هزینه',
        'age' => 'سن',
        'sex' => 'جنسیت',
        'owner_id' => 'بیمه گذار',
        'reagent_id' => 'معرف',
        'info.gender' => 'جنسیت',
        'gender' => 'جنسیت',
        'day' => 'روز',
        'month' => 'ماه',
        'year' => 'سال',
        'hour' => 'ساعت',
        'minute' => 'دقیقه',
        'second' => 'ثانیه',
        'title' => 'عنوان',
        'text' => 'متن',
        'content' => 'محتوا',
        'description' => 'توضیحات',
        'birthday' => 'تاریخ تولد',
        'back' => 'بانک',
        'excerpt' => 'گلچین کردن',
        'date' => 'تاریخ',
        'time' => 'زمان',
        'available' => 'موجود',
        'caption' => 'عنوان',
        'size' => 'اندازه',
        'city_id' => 'شهر',
        'city' => 'شهر',
        'message' => 'پیام',
        'province' => 'استان',
        'national_code' => 'کد ملی',
        'postal_code' => 'کد پستی',
        'is_default' => 'پیش فرض',
        'type' => 'نوع',
        'rate_up' => 'نرخ افزایش',
        'from' => 'از',
        'to' => 'تا',
        'card_number' => 'شماره کارت',
        'shaba' => 'شبا',
        'logo' => 'لوگو',
        'meta_title' => 'عنوان متا',
        'meta_description' => 'توضیحات متا',
        'is_active' => 'فعال',
        'fullname' => 'نام و نام خانوادگی',
        'requested_at' => 'تاریخ درخواست',
        'request_at' => 'تاریخ درخواست',
        'comment' => 'نظر',
        'captcha' => 'کد کپتچا',
        'quantity' => 'موجودی',
        'pay_type' => 'نوع پرداخت',
        'is_virtual' => 'مجازی',
        'is_assigned' => 'اختصاصی',
        'assigned_list' => 'لیست اختصاصی شده',
        'expire_date' => 'تاریخ انقضا',
        'category_id' => 'دسته بندی',
        'nb_downloadable' => 'تعداد قابلیت دانلود',
        'filename' => 'نام فایل',
        'question' => 'پرسش',
        'discount_percent' => 'درصد تخفیف',
        'exp_date' => 'تاریخ انقضا',
        'father' => 'نام پدر',
        'info.father' => 'نام پدر',
        'info.martial' => 'تاهل',
        'info.marital' => 'تاهل',
        'martial' => 'تاهل',
        'marital' => 'تاهل',
        'sp_date' => 'مدت زمان',
        'auc_date' => 'مدت زمان',
        'base_price' => 'قیمت پایه',
        'percent' => 'درصد',
        'cover' => 'کاور',
        'is_aggregate' => 'تجمیع',
        'created_at' => 'تاریخ ثبت',
        'info.interview_at' => 'تاریخ مصاحبه',
        'interview_at' => 'تاریخ مصاحبه',
        'reagent' => 'معرف',
        'image' => 'تصویر',
        'level' => 'سطح',
        'count' => 'تعداد',
        'rate' => 'نرخ',
        'realemail' => 'ایمیل',
        'realmobile' => 'موبایل',
        'realagrement' => 'توافق کاربری',
        'comp_name' => 'نام کمپانی',
        'comp_register_number' => 'شماره ثبت شرکت',
        'comp_economy_number' => 'شماره اقتصادی',
        'comp_tel' => 'تلفن شرکت',
        'latin' => 'نام لاتین',

        // custom
        'customer_id' => 'مشتری',
        'user_id' => 'کاربر',
        'name_en' => 'نام انگلیسی مسافر',
        'family_en' => 'نام خانوادگی انگلیسی مسافر',
        'name_fa' => 'نام فارسی مسافر',
        'family_fa' => 'نام خانوادگی فارسی مسافر',
        'agreement' => 'قوانین و مقررات',
        'captchcode' => 'تصویر امنیتی',
        'phone' => 'موبایل',
        'new_password' => 'رمز جدید',
        'current_password' => 'رمز فعلی',
        'passport' => 'پاسپورت',
        'code' => 'کد ملی',
        'interview_at' => 'تاریخ مصاحبه',
        'permission' => 'سطح دسترسی',
    ],

];
