<?php

use Illuminate\Database\Seeder;

class UserSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = [
            'email'=>'admin@gmail.com',
            'password'=> '123123',
            'firstname'=>'tony',
            'lastname'=>'chen',
            'user_type'=>3
        ];
        App\Models\User::create($user);

        return;
        /*$faker = Faker::create();
        for ($i = 0; $i < 50; $i++) {
            $user = [
            'email'=>$faker->email,
            'password'=>Hash::make('123123'),
            'firstname'=>$faker->firstName,
            'lastname'=>$faker->lastName,
            'user_type'=>3
            ];
            App\Models\User::create($user);
        }*/
    }
}
